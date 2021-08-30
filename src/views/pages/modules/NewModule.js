import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CLabel, CRow } from '@coreui/react';
import { Form } from '@unform/web';
import { push } from 'connected-react-router';
import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input } from 'src/reusable';
import { fetchCreateSystemModule } from 'src/store/system_modules';
import * as Yup from 'yup';

const NewModule = () => {
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.system_modules);
  const dispatch = useDispatch(null)
  const formRef = useRef(null)

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        user_id: Yup.string().required('Usuário é obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await dispatch(fetchCreateSystemModule(data))
        .unwrap()
        .then(() => {
          toast.success('Módulo criado com sucesso!');
          dispatch(push('/modules'))
        })
        .catch(() => {
          toast.error('Erro ao criar módulo!');
        })
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Cadastrar módulo</h3>
            </CCardHeader>
            <CCardBody>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <Input name="user_id" defaultValue={user?.id} hidden />
                <CFormGroup>
                  <CLabel>Nome</CLabel>
                  <Input name="name" type="text" placeholder="Nome" />
                </CFormGroup>
                <CFormGroup>
                  <CButton disabled={loading} type="submit" color="primary">
                    Cadastrar
                  </CButton>
                </CFormGroup>
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default NewModule;
