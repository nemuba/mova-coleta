import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateAction } from 'src/store/profile';
import { fetchCurrentUser } from '../../../store/auth';
import { fetchAllCollects, fetchDeleteCollect } from '../../../store/collects';

const Modal = ({ collect, title, status }) => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const { loading } = useSelector(state => state.collects);

  const toggle = () => {
    setModal(!modal);
  }

  const handleExcludeCollect = async (collect) => {
    await dispatch(fetchDeleteCollect(collect.id))
      .unwrap()
      .then(async () => {
        await dispatch(fetchAllCollects());
        await dispatch(fetchCurrentUser())
          .unwrap()
          .then(res => dispatch(updateAction(res.profile)))
        toast.success('Coleta excluída com sucesso!');
      })

    toggle();
    history.push('/collects');
  }

  return (
    <>
      <CButton
        type="button"
        size="sm"
        color="danger"
        disabled={collect?.collect_status?.name !== status}
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
          <CButton
            disabled={loading}
            onClick={() => handleExcludeCollect(collect)}
            type="button"
            color="primary"
          >
            Excluir
          </CButton>
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
