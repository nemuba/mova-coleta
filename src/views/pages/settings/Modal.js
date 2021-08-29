import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchDeleteSettings } from '../../../store/settings';

const Modal = ({ setting, title }) => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleConfirm = async (setting) => {
    await dispatch(fetchDeleteSettings(setting))
      .unwrap()
      .then(() => {
        toast.success('Configuração deletada !')
      })
      .catch(() => {
        toast.error('Erro ao deletar configuração !')
      })

    toggle();
    history.push('/settings');
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
          <CButton onClick={() => handleConfirm(setting)} type="button" color="primary">Excluir</CButton>{' '}
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
