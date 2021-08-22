import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCollect } from '../../../store/route_collect';

const Modal = ({ collect, title }) => {
  const dispatch = useDispatch(null);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleExcludeCollect = (collect) => {
    console.log(collect.id)
    dispatch(removeCollect(collect.id))
    toggle();
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
