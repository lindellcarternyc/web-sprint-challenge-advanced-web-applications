import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={props => {
        if (!window.localStorage.getItem('bubbles-token')) {
          return <Redirect to="/" />
        }
        return <Component {...props} />
      }}
    />
  )
}

export default PrivateRoute


//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in