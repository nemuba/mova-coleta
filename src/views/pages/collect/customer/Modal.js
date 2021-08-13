import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { currentUserFetch } from '../../../../store/fetch_actions/auth';
import { deleteCollect } from '../../../../store/fetch_actions/collects';

const Modal = ({ collect, title, status }) => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleExcludeCollect = (collect) => {
    dispatch(deleteCollect(collect))
    dispatch(currentUserFetch())
    toggle();
    history.push('/collects');
  }

  return (
    <>
      <CButton
        type="button"
        size="sm"
        color="secondary"
        disabled={collect?.collect_status?.name !== status}
        onClick={toggle}
      >Excluir</CButton>
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
          <CButton onClick={() => handleExcludeCollect(collect)} type="button" color="primary">Excluir</CButton>{' '}
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
