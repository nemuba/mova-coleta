import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateAction } from 'src/store/profile';
import { fetchCurrentUser } from '../../../store/auth';
import { fetchAllSystemModules, fetchDeleteSystemModule } from '../../../store/system_modules';

const Modal = ({ module, title }) => {
  const { loading } = useSelector(state => state.system_modules);
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const handleExcludeModule = async (module) => {
    await dispatch(fetchDeleteSystemModule(module.id))
      .unwrap()
      .then(async () => {
        await dispatch(fetchAllSystemModules())
          .unwrap()
          .then(async () => {
            await dispatch(fetchCurrentUser())
              .unwrap()
              .then(res => dispatch(updateAction(res.profile)))
            toast.success('Módulo excluído com sucesso!');
          })
      })
      .catch(() => {
        toast.error('Erro ao excluir módulo');
      })

    toggle();
    history.push('/modules');
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
            onClick={() => handleExcludeModule(module)}
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
