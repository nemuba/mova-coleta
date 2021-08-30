import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CLabel, CRow } from '@coreui/react';
import { Form } from '@unform/web';
import { push } from 'connected-react-router';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from 'src/reusable';
import { fetchFindSystemModule, fetchUpdateSystemModule } from 'src/store/system_modules';
import * as Yup from 'yup';

const ModuleDetails = () => {
  const { system_module, loading } = useSelector(state => state.system_modules);
  const dispatch = useDispatch(null)
  const formRef = useRef(null)
  const { params } = useRouteMatch()

  useEffect(() => {
    if (params && params.id) {
      dispatch(fetchFindSystemModule(params.id))
    }
  }, [params, dispatch])

  useEffect(() => {
    if (system_module) {
      formRef.current.setData({
        id: system_module?.id,
        user_id: system_module?.user_id,
        name: system_module?.name,
      })
    }
  }, [system_module])


  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        user_id: Yup.string().required('Usuário é obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await dispatch(fetchUpdateSystemModule(data))
        .unwrap()
        .then(() => {
          toast.success('Módulo atualizado com sucesso!');
          dispatch(push('/modules'))
        })
        .catch(() => {
          toast.error('Erro ao atualizar módulo!');
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
              <h3>Atualizar módulo</h3>
            </CCardHeader>
            <CCardBody>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <Input name="id" hidden />
                <Input name="user_id" hidden />
                <CFormGroup>
                  <CLabel>Nome</CLabel>
                  <Input name="name" type="text" placeholder="Nome" />
                </CFormGroup>
                <CFormGroup>
                  <CButton disabled={loading} type="submit" color="success">
                    Atualizar
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

export default ModuleDetails;
