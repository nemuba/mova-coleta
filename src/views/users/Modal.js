import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteUser } from 'src/store/fetch_actions/users';

const Modal = ({ user, title }) => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleExcludeUser = (user) => {
    dispatch(deleteUser(user))
    toggle();
    history.push('/users');
  }

  return (
    <>
      <CButton
        type="button"
        color="danger"
        onClick={toggle}
        className="mt-2 ml-1"
      >Excluir Usuário</CButton>
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
