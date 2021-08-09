
import React from 'react';
import { retry } from '../../../services/functions';

const UserForm = React.lazy(() => retry(() => import('../UserForm')));


const Customer = () => {
  return (
    <UserForm role="customer" title="Preencha os dados do Cliente" />
  );
}

export default Customer;
