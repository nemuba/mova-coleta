import AdminDashBoard from './admin/Dashboard'
import CustomerDashboard from './customer/Dashboard'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../../store/fetch_actions/users'
import { fetchCurrentUser } from '../../store/auth'

const Dashboard = () => {
  const { user } = useSelector(state => state.auth)
  const { users } = useSelector(state => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listUsers())
    dispatch(fetchCurrentUser())
  }, [dispatch])

  switch (user.role) {
    case 'admin':
      return <AdminDashBoard users={users} />
    case 'customer':
      return <CustomerDashboard user={user} />
    default:
      return <div>Loading...</div>
  }
}

export default Dashboard
