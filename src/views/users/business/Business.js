
import React from 'react';
import { retry } from '../../../services/functions';

const UserForm = React.lazy(() => retry(() => import('../UserForm')));

const Business = () => {
  return (
    <UserForm role="business" title="Preencha os dados da Empresa" />
  );
}

export default Business;
