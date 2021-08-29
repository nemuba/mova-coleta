import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'
import { fetchCurrentUser } from 'src/store/auth';
import { updateAction } from 'src/store/profile';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    if (user) {
      dispatch(updateAction(user?.profile))
    } else if (isAuthenticated) {
      dispatch(fetchCurrentUser())
    }
  }, [user, isAuthenticated, dispatch]);


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
