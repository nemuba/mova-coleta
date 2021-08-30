import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CLabel, CRow } from '@coreui/react';
import { Form } from '@unform/web';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input, SelectInput } from 'src/reusable';
import { fetchAddSettings } from '../../../store/settings'
import { fetchAllSystemModules } from '../../../store/system_modules'
import * as Yup from 'yup';
import { push } from 'connected-react-router';

const NewSettings = () => {
  const { loading, error } = useSelector(state => state.settings);
  const { system_modules } = useSelector(state => state.system_modules);
  const [modules, setModules] = useState([]);
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        system_module_id: Yup.number().required('Módulo requerido!'),
        param: Yup.string().required('Parâmetro requerido!'),
        value: Yup.string().required('Valor requerido!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await dispatch(fetchAddSettings(data))
        .unwrap()
        .then(() => {
          toast.success('Configuração criada com sucesso!');
          dispatch(push('/settings'));
        }).cath(err => {
          toast.error(err.message);
        });
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

  useEffect(() => {
    toast.error(error)
  }, [error])

  useEffect(() => {
    dispatch(fetchAllSystemModules())
  }, [dispatch])

  useEffect(() => {
    if (system_modules.length > 0) {
      const modules = system_modules.map(module => ({ value: module.id, label: module.name }))
      setModules(modules)
    }
  }, [system_modules])

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Cadastrar Configuração</h3>
            </CCardHeader>
            <CCardBody>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <CFormGroup row>
                  <CCol md="4" lg="4" sm="4">
                    <CLabel>Módulo</CLabel>
                    <SelectInput options={modules} name="system_module_id" placeholder="Selecione ..." />
                  </CCol>
                  <CCol md="4" lg="4" sm="4">
                    <CLabel>Parâmetro</CLabel>
                    <Input id="param" name="param" placeholder="Parâmetro" type="text" />
                  </CCol>
                  <CCol md="4" lg="4" sm="4">
                    <CLabel>Valor</CLabel>
                    <Input id="value" name="value" placeholder="Valor" type="number" />
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CButton color="primary" type="submit" disabled={loading}>
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

export default NewSettings;
