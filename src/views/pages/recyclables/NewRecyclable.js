import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CLabel, CRow } from '@coreui/react';
import { Form } from '@unform/web';
import { push } from 'connected-react-router';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input, SelectInput } from 'src/reusable';
import { fetchCreateRecyclable } from 'src/store/recyclables';
import * as Yup from 'yup';

const options = [
  { value: 'kilogram', label: 'KG' },
  { value: 'gram', label: 'Grama' },
  { value: 'unity', label: 'Unidade' },
]

const NewRecyclable = () => {
  const { loading } = useSelector(state => state.recyclables);
  const dispatch = useDispatch(null)
  const formRef = useRef(null)

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        unit_of_measurement: Yup.string().required('Unidade de Medida é obrigatório'),
        measure: Yup.number().typeError('Quantidade é obrigatório').required('Quantidade é obrigatório'),
        point: Yup.number().typeError('Ponto é obrigatório').required('Ponto é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await dispatch(fetchCreateRecyclable(data))
        .unwrap()
        .then(() => {
          toast.success('Reciclável criado com sucesso!');
          dispatch(push('/recyclables'))
        })
        .catch(() => {
          toast.error('Erro ao criar reciclável!');
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
              <h3>Cadastrar reciclável</h3>
            </CCardHeader>
            <CCardBody>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <CFormGroup>
                  <CLabel>Nome</CLabel>
                  <Input name="name" type="text" placeholder="Nome" />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Preço</CLabel>
                  <SelectInput
                    name="unit_of_measurement"
                    options={options}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Quantidade</CLabel>
                  <Input name="measure" type="number" placeholder="Quantidade" />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Ponto</CLabel>
                  <Input name="point" type="number" placeholder="Ponto" />
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

export default NewRecyclable;
