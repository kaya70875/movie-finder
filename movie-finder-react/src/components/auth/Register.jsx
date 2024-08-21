import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import './css/_AuthPage.scss';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");

  const [validPass, setValidPass] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    setError('')
  }, [email]);

  useEffect(() => {
    setValidPass(PASS_REGEX.test(password));
    setError('')
  }, [password]);

  useEffect(() => {
    setValidMatch(password === passwordMatch);
    setError('')
  }, [password, passwordMatch]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== passwordMatch) {
      return setError("Password Do not Match !");
    }

    if(!email || !password || !passwordMatch){
      return setError('Please fill all forms!');
    }

    try {
      setLoading(true);
      await signUp(email.trim(), password);
    } catch (err) {
      if(err.code === 'auth/email-already-in-use'){
        setError('This email is already in use!');
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth__wrap">
      <div className="auth__container">
        <p className={error ? 'instructions' : 'offscreen'}>{error}</p>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp} className="input__fields">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className={!email ? 'auth__input' : !validEmail ? "auth__input invalid" : "auth__input valid"}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className={!password ? 'auth__input' : !validPass && !validMatch ? "auth__input invalid" : "auth__input valid"}
          />
          <label htmlFor="pwdagain">Password Again</label>
          <input
            type="password"
            id="pwdagain"
            onChange={(e) => setPasswordMatch(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className={!passwordMatch ? "auth__input" : !validMatch ? "auth__input invalid" : "auth__input valid"}
          />
          <p className={passwordMatch && !validMatch && password ? 'instructions' : 'offscreen'}>Passwords do not match!</p>
          <button disabled={loading} className="auth-button">Sign Up</button>
        </form>
        <Link to='/movie-finder/login'>Already Have Account ?</Link>
      </div>
    </div>
  );
}
