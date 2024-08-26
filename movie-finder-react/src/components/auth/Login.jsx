import React, {useEffect, useReducer} from 'react';
import {useAuth} from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './css/_AuthPage.scss';

const initialState = {
  email : '',
  password : '',
  error : '',
  loading : false
}

function reducer(state , action){
  switch(action.type){
    case 'SET_EMAIL' : 
      return {...state , email : action.payload};
    case 'SET_PASSWORD' : 
      return {...state , password : action.payload};
    case 'SET_ERROR' : 
      return {...state , error : action.payload};
    case 'SET_LOADING' : 
      return {...state , loading : action.payload};
    default:
      return state;
  }
}

export default function Login() {
  const [state , dispatch] = useReducer(reducer , initialState);
  
  const {logIn} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({type : 'SET_ERROR' , payload : ''});
  }  ,[state.email , state.password])

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!state.email || !state.password) {
      return dispatch({type : 'SET_ERROR' , payload : 'Please Fill All Forms!'});
    }

    try{
      dispatch({type : 'SET_LOADING' , payload : true});
      await logIn(state.email.trim() , state.password)
      navigate('/movie-finder');
    }catch(err){
      if (err.code === 'auth/invalid-credential') {
        dispatch({type : 'SET_ERROR' , payload : 'Invalid username or password'});
      }
      else if(err.code === 'auth/too-many-requests'){
        dispatch({type : 'SET_ERROR' , payload : 'Too many wrong try , please try again later!'});
      }
      else {
        console.log(err);
        dispatch({type : 'SET_ERROR' , payload : 'An error occured , Please try again later.'});
      }
    }finally{
      dispatch({type : 'SET_LOADING' , payload : false});
    }
    
  };

  return (
    <div className="auth__wrap">
      <div className="auth__container">
        <p className={state.error ? 'instructions' : 'offscreen'}>{state.error}</p>
        <h1>Sign Up</h1>
        <form className="input__fields" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            autoComplete='off'
            id="email"
            onChange={(e) => dispatch({type : 'SET_EMAIL' , payload : e.target.value})}
            className='auth__input'
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete='off'
            onChange={(e) => dispatch({type : 'SET_PASSWORD' , payload : e.target.value})}
            className='auth__input'
          />
          <button disabled={state.loading} className='auth-button'>{state.loading ? 'Logging' : 'Log In'}</button>
        </form>
        <Link to='/movie-finder/register'>Need An Account ?</Link>
      </div>
    </div>
  );
}
