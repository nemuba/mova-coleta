import React, { useEffect } from 'react'
import AdminDashBoard from './admin/Dashboard'
import CustomerDashboard from './customer/Dashboard'
import BusinessDashBoard from './business/Dashboard'
import CollectorDashBoard from './collector/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../../store/users'
import { fetchCurrentUser } from '../../store/auth'

const Dashboard = () => {
  const { user } = useSelector(state => state.auth)
  const { users } = useSelector(state => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(fetchCurrentUser())
  }, [dispatch])

  switch (user?.role) {
    case 'admin':
      return <AdminDashBoard users={users} />
    case 'customer':
      return <CustomerDashboard user={user} />
    case 'business':
      return <BusinessDashBoard user={user} />
    case 'collector':
      return <CollectorDashBoard user={user} />
    default:
      return <div>Loading...</div>
  }
}

export default Dashboard
