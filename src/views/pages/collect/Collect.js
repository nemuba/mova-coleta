import React from 'react';
import { useSelector } from 'react-redux';
import CollectCustomer from './customer/Collect'
import CollectAdmin from './admin/Collect'
import CollectCollector from './collector/Collect'

const Collect = () => {
  const { user } = useSelector(state => state.auth)

  switch (user?.role) {
    case 'customer':
      return <CollectCustomer user={user} />
    case 'admin':
      return <CollectAdmin user={user} />
    case 'collector':
      return <CollectCollector user={user} />
    default:
      return <p> Loading ...</p>
  }
}

export default Collect;


