import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateAction } from 'src/store/profile';
import { fetchCurrentUser } from '../../../store/auth';
import { fetchUpdateRoute } from '../../../store/routes';
import { push } from 'connected-react-router';

const ModalFinished = ({ route, title }) => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleFinishedRoute = async (route) => {
    await dispatch(fetchUpdateRoute({ ...route, status: 1 }))
      .unwrap()
      .then(async () => {
        toast.success('Rota finalizada!');
        await dispatch(fetchCurrentUser())
          .unwrap()
          .then(res => dispatch(updateAction(res.profile)))

        dispatch(push('/routes'));
      })
      .catch(() => {
        toast.error('Erro ao finalizar rota');
      })

    toggle();
    history.push('/routes');
  }

  return (
    <>
      <CButton
        type="button"
        size="sm"
        color="success"
        onClick={toggle}
        title="Finalizar rota"
      >
        <CIcon name="cil-check" />
      </CButton>
      <CModal
        show={modal}
        onClose={toggle}
        centered={true}
      >
        <CModalHeader>{title}</CModalHeader>
        <CModalBody>
          <p>Tem certeza que deseja finalizar a rota?</p>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => handleFinishedRoute(route)} type="button" color="primary">Finalizar</CButton>{' '}
          <CButton
            type="button"
            color="danger"
            onClick={toggle}
          >Cancelar</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalFinished;
