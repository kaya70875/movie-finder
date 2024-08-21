import React, { useEffect, useState } from 'react';
import {useAuth} from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './css/_AuthPage.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error , setError] = useState('');
  const [loading , setLoading] = useState(false);
  
  const {logIn} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }  ,[email , password])

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!email || !password) {
      return setError('Please fill all forms!');
    }

    try{
      setLoading(true)
      await logIn(email.trim() , password)
      navigate('/movie-finder');
    }catch(err){
      if (err.code === 'auth/invalid-credential') {
        setError("Wrong Username or Password");
      }
      else if(err.code === 'auth/too-many-requests'){
        setError('Too many wrong try , please try again later!');
      }
      else {
        console.log(err);
        setError('An error occured , Please try again later.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth__wrap">
      <div className="auth__container">
        <p className={error ? 'instructions' : 'offscreen'}>{error}</p>
        <h1>Sign Up</h1>
        <form className="input__fields" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            autoComplete='off'
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className='auth__input'
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
            className='auth__input'
          />
          <button disabled={loading} className='auth-button'>{loading ? 'Logging' : 'Log In'}</button>
        </form>
        <Link to='/movie-finder/register'>Need An Account ?</Link>
      </div>
    </div>
  );
}
