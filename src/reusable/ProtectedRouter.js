import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'
import { currentUserFetch } from '../store/fetch_actions/auth'
import { isAuthenticated as Authenticated } from '../services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    if (Authenticated()){
      dispatch(currentUserFetch())
    }
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
