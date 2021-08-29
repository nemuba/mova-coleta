import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchDeleteUser, fetchAllUsers } from '../../../store/users';

const Modal = ({ user, title }) => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleExcludeUser = async (user) => {
    await dispatch(fetchDeleteUser(user.id))
      .unwrap()
      .then(async () => {
        await dispatch(fetchAllUsers())
        toast.success('Usuário excluído com sucesso!');
      })

    toggle();
    history.push('/users');
  }

  return (
    <>
      <CButton
        type="button"
        color="danger"
        onClick={toggle}
        size="sm"
        className="ml-2"
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
          Confirmar operação ?
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => handleExcludeUser(user)} type="button" color="primary">Excluir</CButton>{' '}
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
