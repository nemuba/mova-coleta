import React from 'react';
import { useSelector } from 'react-redux';
import CollectCustomer from './customer/Collect'
import CollectAdmin from './admin/Collect'

const Collect = () => {
  const { user } = useSelector(state => state.auth)

  switch (user?.role) {
    case 'customer':
      return <CollectCustomer user={user} />
    case 'admin':
      return <CollectAdmin user={user} />
    default:
      return <p> Loading ...</p>
  }
}

export default Collect;


