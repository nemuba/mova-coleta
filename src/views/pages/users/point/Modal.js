import CIcon from '@coreui/icons-react';
import { CButton, CFormGroup, CLabel, CModal, CModalBody, CModalHeader } from '@coreui/react';
import { Scope } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from 'src/reusable';
import * as Yup from 'yup';
import { fetchUpdateUser, fetchAllUsers } from '../../../../store/users';

const Modal = ({ user, title }) => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const formRef = useRef(null);
  const { error, loading } = useSelector((state) => state.users);

  const toggle = () => {
    setModal(!modal);
  }

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        id: Yup.string().required(''),
        user_point_attributes: Yup.object().shape({
          value: Yup.string().required('Valor obrigatório !'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await dispatch(fetchUpdateUser(data))
        .unwrap()
        .then(async () => {
          dispatch(fetchAllUsers());
          toast.success('Pontuação atualizada !');
          toggle();
          history.push('/users');
        }).catch(() => {
          console.log(error)
          toast.error('Erro ao atualizar pontuação do usuário !');
        })

    } catch (err) {
      const validationErrors = {};
      console.log(err)
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  useEffect(() => {
    if (user) {
      formRef.current.setData({
        id: user?.id,
        user_point_attributes: {
          id: user?.user_point?.id,
          value: user?.user_point?.value,
        }
      });
    }
  }, [user]);

  return (
    <>
      <CButton
        type="button"
        color="success"
        onClick={toggle}
        className="my-2"
        size="sm"
      >
        <CIcon name="cil-gift" />
      </CButton>
      <CModal
        show={modal}
        onClose={toggle}
        centered={true}
      >
        <CModalHeader>
          <h4>{title}</h4>
        </CModalHeader>
        <CModalBody>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input id="user_id" name="id" hidden />
            <CFormGroup>
              <Scope path="user_point_attributes">
                <Input id="user_point_id" name="id" hidden />
                <CLabel>Ponto</CLabel>
                <Input id="value" name="value" type="number" />
              </Scope>
            </CFormGroup>
            <CFormGroup>
              <CButton
                type="submit"
                color="success"
                disabled={loading}
              >
                Salvar
              </CButton>
              <CButton
                type="button"
                color="danger"
                className="float-right"
                onClick={toggle}
              >Cancelar</CButton>
            </CFormGroup>
          </Form>
        </CModalBody>
      </CModal>
    </>
  )
}

export default Modal;
