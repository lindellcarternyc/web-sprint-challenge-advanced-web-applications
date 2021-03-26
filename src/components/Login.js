import React, { useEffect, useState } from "react";
import axios from 'axios'

const INITIAL_FORM_STATE = {
  username: '',
  password: ''
}

const Login = ({ history }) => {
  const [values, setValues] = useState(INITIAL_FORM_STATE)

  useEffect(()=>{
    const token = window.localStorage.getItem('bubbles-token')
    if (token) {
      history.push(`/bubbles`)
    }
  });
  
  const [error, setError] = useState('')

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    })
    setError('')
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const username = values.username.trim()
    const password = values.password.trim()

    if (!username || !password) {
      return setError('Username or Password not valid')
    }

    setValues(INITIAL_FORM_STATE)

    axios.post('http://localhost:5000/api/login', { username, password })
      .then(res => {
        const token = res.data.payload
        window.localStorage.setItem('bubbles-token', token)
      })
      .catch(_ => {
        setError('Username or Password not valid')
      })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input 
            data-testid="username" 
            type="text" 
            name="username" 
            id="username" 
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div 
          style={{
            marginTop: '1rem'
          }}
        >
          <label htmlFor="password">Password: </label>
          <input 
            data-testid="password"
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.