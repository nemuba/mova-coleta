import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CLabel, CRow } from '@coreui/react';
import { Form } from '@unform/web';
import { push } from 'connected-react-router';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input } from 'src/reusable';
import { fetchCreateProduct } from 'src/store/products';
import * as Yup from 'yup';

const NewProduct = () => {
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.products);
  const dispatch = useDispatch(null)
  const formRef = useRef(null)

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        user_id: Yup.string().required('Usuário é obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
        price: Yup.number().typeError('Preço é obrigatório').required('Preço é obrigatório'),
        point: Yup.number().typeError('Ponto é obrigatório').required('Ponto é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await dispatch(fetchCreateProduct(data))
        .unwrap()
        .then(() => {
          toast.success('Produto criado com sucesso!');
          dispatch(push('/products'))
        })
        .catch(() => {
          toast.error('Erro ao criar produto!');
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
              <h3>Cadastrar produto</h3>
            </CCardHeader>
            <CCardBody>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <Input name="user_id" defaultValue={user?.id} hidden />
                <CFormGroup>
                  <CLabel>Nome</CLabel>
                  <Input name="name" type="text" placeholder="Nome" />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Preço</CLabel>
                  <Input name="price" type="number" placeholder="Preço" />
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

export default NewProduct;
