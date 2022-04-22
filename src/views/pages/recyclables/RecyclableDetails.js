import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CLabel, CRow } from '@coreui/react';
import { Form } from '@unform/web';
import { push } from 'connected-react-router';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input, SelectInput } from 'src/reusable';
import { fetchFindRecyclable, fetchUpdateRecyclable } from 'src/store/recyclables';
import * as Yup from 'yup';

const options = [
  { value: 'kilogram', label: 'KG' },
  { value: 'gram', label: 'Grama' },
  { value: 'unity', label: 'Unidade' },
]

const RecyclableDetails = () => {
  const { recyclable, loading } = useSelector(state => state.recyclables);
  const dispatch = useDispatch(null)
  const formRef = useRef(null)
  const { params } = useRouteMatch()

  useEffect(() => {
    if (params && params.id) {
      dispatch(fetchFindRecyclable(params.id))
    }
  }, [params, dispatch])

  const getUnitOfMeasurement = options.find(option => option.value === recyclable?.unit_of_measurement)

  useEffect(() => {
    if (recyclable) {
      formRef.current.setData({
        id: recyclable?.id,
        name: recyclable?.name,
        unit_of_measurement: getUnitOfMeasurement,
        measure: recyclable?.measure,
        point: recyclable?.point,
      })
    }
  }, [recyclable, getUnitOfMeasurement])


  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        id: Yup.string().required('ID é obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
        unit_of_measurement: Yup.string().required('Unidade de Medida é obrigatório'),
        measure: Yup.number().typeError('Quantidade é obrigatório').required('Quantidade é obrigatório'),
        point: Yup.number().typeError('Ponto é obrigatório').required('Ponto é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await dispatch(fetchUpdateRecyclable(data))
        .unwrap()
        .then(() => {
          toast.success('Reciclável atualizado com sucesso!');
          dispatch(push('/recyclables'))
        })
        .catch(() => {
          toast.error('Erro ao atualizar reciclável!');
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
              <h3>Atualizar produto</h3>
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

export default RecyclableDetails;
