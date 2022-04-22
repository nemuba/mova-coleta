import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateAction } from 'src/store/profile';
import { fetchCurrentUser } from 'src/store/auth';
import { fetchAllRecyclables, fetchDeleteRecyclable } from 'src/store/recyclables';

const Modal = ({ recyclable, title }) => {
  const { loading } = useSelector(state => state.recyclables);
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleExcludeRecyclable = async (recyclable) => {
    await dispatch(fetchDeleteRecyclable(recyclable.id))
      .unwrap()
      .then(async () => {
        await dispatch(fetchAllRecyclables())
          .unwrap()
          .then(async () => {
            await dispatch(fetchCurrentUser())
              .unwrap()
              .then(res => dispatch(updateAction(res.profile)))
            toast.success('Reciclável excluído com sucesso!');
          })
      })
      .catch(() => {
        toast.error('Erro ao excluir reciclável');
      })

    toggle();
    history.push('/recyclables');
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
          <CButton
            disabled={loading}
            onClick={() => handleExcludeRecyclable(recyclable)}
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
