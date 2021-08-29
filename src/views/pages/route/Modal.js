import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateAction } from 'src/store/profile';
import { fetchCurrentUser } from '../../../store/auth';
import { fetchDeleteRoute } from '../../../store/routes';

const Modal = ({ route, title }) => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleExcludeCollect = async (route) => {
    await dispatch(fetchDeleteRoute(route.id))
      .unwrap()
      .then(async () =>{
        toast.success('Rota excluída com sucesso!');
        await dispatch(fetchCurrentUser())
          .unwrap()
          .then(res => dispatch(updateAction(res.profile)))
      })
      .catch(() =>{
        toast.error('Erro ao excluir rota');
      })

    toggle();
    history.push('/routes');
  }

  return (
    <>
      <CButton
        type="button"
        size="sm"
        color="danger"
        onClick={toggle}
        title="Excluir"
      >
        <CIcon name="cil-trash" />
      </CButton>
      <CModal
        show={modal}
        onClose={toggle}
        centered={true}
      >
        <CModalHeader>{title}</CModalHeader>
        <CModalBody>
          Realmente deseja confirmar operação de exclusão?
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => handleExcludeCollect(route)} type="button" color="primary">Excluir</CButton>{' '}
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

export default Modal;
