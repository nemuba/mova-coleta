
import React from 'react';
import { retry } from '../../../services/functions';

const UserForm = React.lazy(() => retry(() => import('../UserForm')));


const Collector = () => {
  return (
    <UserForm role="collector" title="Preencha os dados do Coletor" />
  );
}

export default Collector;
