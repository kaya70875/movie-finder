import React, { useEffect, useReducer } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import './css/_AuthPage.scss';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const initialState = {
  email: '',
  password: '',
  passwordMatch: '',
  validEmail: false,
  validPass: false,
  validMatch: false,
  error: '',
  loading: false
};

const enum REDUCER_ACTION_TYPE {
  SET_EMAIL,
  SET_PASSWORD,
  SET_PASSWORD_MATCH,
  SET_VALID_EMAIL,
  SET_VALID_PASS,
  SET_VALID_MATCH,
  SET_ERROR,
  SET_LOADING,
}

type ReducerAction =
  | { type: REDUCER_ACTION_TYPE.SET_EMAIL; payload: string }
  | { type: REDUCER_ACTION_TYPE.SET_PASSWORD; payload: string }
  | { type: REDUCER_ACTION_TYPE.SET_PASSWORD_MATCH; payload: string }
  | { type: REDUCER_ACTION_TYPE.SET_VALID_EMAIL; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_VALID_PASS; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_VALID_MATCH; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_ERROR; payload: string }
  | { type: REDUCER_ACTION_TYPE.SET_LOADING; payload: boolean };

const reducer = (state : typeof initialState, action : ReducerAction) : typeof initialState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_EMAIL:
      return { ...state, email: action.payload, error: '' };
    case REDUCER_ACTION_TYPE.SET_PASSWORD:
      return { ...state, password: action.payload, error: '' };
    case REDUCER_ACTION_TYPE.SET_PASSWORD_MATCH:
      return { ...state, passwordMatch: action.payload, error: '' };
    case REDUCER_ACTION_TYPE.SET_VALID_EMAIL:
      return { ...state, validEmail: action.payload };
    case REDUCER_ACTION_TYPE.SET_VALID_PASS:
      return { ...state, validPass: action.payload };
    case REDUCER_ACTION_TYPE.SET_VALID_MATCH:
      return { ...state, validMatch: action.payload };
    case REDUCER_ACTION_TYPE.SET_ERROR:
      return { ...state, error: action.payload };
    case REDUCER_ACTION_TYPE.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default function SignUp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { signUp } = useAuth()!;

  useEffect(() => {
    dispatch({ type: REDUCER_ACTION_TYPE.SET_VALID_EMAIL, payload: EMAIL_REGEX.test(state.email) });
  }, [state.email]);

  useEffect(() => {
    dispatch({ type: REDUCER_ACTION_TYPE.SET_VALID_PASS, payload: PASS_REGEX.test(state.password) });
  }, [state.password]);

  useEffect(() => {
    dispatch({ type: REDUCER_ACTION_TYPE.SET_VALID_MATCH, payload: state.password === state.passwordMatch });
  }, [state.password, state.passwordMatch]);

  const handleSignUp = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.password !== state.passwordMatch) {
      return dispatch({ type: REDUCER_ACTION_TYPE.SET_ERROR, payload: 'Passwords do not match!' });
    }

    if (!state.email || !state.password || !state.passwordMatch) {
      return dispatch({ type: REDUCER_ACTION_TYPE.SET_ERROR, payload: 'Please fill all forms!' });
    }

    try {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_LOADING, payload: true });
      await signUp(state.email.trim(), state.password);
    } catch (err : any) {
      if (err.code === 'auth/email-already-in-use') {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_ERROR, payload: 'This email is already in use!' });
      } else {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_ERROR, payload: 'An error occurred, please try again later.' });
      }
    } finally {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_LOADING, payload: false });
    }
  };

  return (
    <div className="auth__wrap">
      <div className="auth__container">
        <p className={state.error ? 'instructions' : 'offscreen'}>{state.error}</p>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp} className="input__fields">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e) => dispatch({ type: REDUCER_ACTION_TYPE.SET_EMAIL, payload: e.target.value })}
            className={!state.email ? 'auth__input' : !state.validEmail ? "auth__input invalid" : "auth__input valid"}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => dispatch({ type: REDUCER_ACTION_TYPE.SET_PASSWORD, payload: e.target.value })}
            className={!state.password ? 'auth__input' : !state.validPass && !state.validMatch ? "auth__input invalid" : "auth__input valid"}
          />
          <label htmlFor="pwdagain">Password Again</label>
          <input
            type="password"
            id="pwdagain"
            onChange={(e) => dispatch({ type: REDUCER_ACTION_TYPE.SET_PASSWORD_MATCH, payload: e.target.value })}
            className={!state.passwordMatch ? "auth__input" : !state.validMatch ? "auth__input invalid" : "auth__input valid"}
          />
          <p className={state.passwordMatch && !state.validMatch && state.password ? 'instructions' : 'offscreen'}>Passwords do not match!</p>
          <button disabled={state.loading} className="auth-button">Sign Up</button>
        </form>
        <Link to='/movie-finder/login'>Already Have Account ?</Link>
      </div>
    </div>
  );
}
