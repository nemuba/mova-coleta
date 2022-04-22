import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FormCollect from './FormCollect';
import WaitingCollect from './WaitingCollect';

const NewCollect = () => {

  const { user } = useSelector(state => state.auth);
  const [lastCollect, setLastCollect] = useState({});
  const statuses = ['Aguardando Confirmação', 'Aguardando Coleta']

  useEffect(() => {
    if (user && user.collects) {
      setLastCollect(user?.collects[user?.collects?.length - 1]);
    }
  }, [user]);

  return (
    <div>
      {lastCollect && statuses.includes(lastCollect?.collect_status?.name) ? (
        <WaitingCollect collect={lastCollect} />
      ) : (
        <FormCollect />
      )
      }
    </div>
  )
}

export default NewCollect;
