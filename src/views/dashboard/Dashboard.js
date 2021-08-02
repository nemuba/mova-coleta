import AdminDashBoard from './admin/Dashboard'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../../store/fetch_actions/users'

const Dashboard = () => {
  const { user } = useSelector(state => state.auth)
  const { users } = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  return user && user.role === 'admin' ? <AdminDashBoard users={users} /> : <div>Loading...</div>

}

export default Dashboard
