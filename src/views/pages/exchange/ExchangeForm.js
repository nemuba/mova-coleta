import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CLabel, CRow } from '@coreui/react';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input, SelectInput } from 'src/reusable';
import { fetchCurrentUser } from 'src/store/auth';
import { fetchAllCustomers, fetchUpdateCustomer } from 'src/store/customers';
import * as Yup from 'yup';

const ExchangeForm = () => {
  const { customers } = useSelector(state => state.customers)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch(null)
  const formRef = useRef(null)

  const [products, setProducts] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {
    dispatch(fetchAllCustomers())
  }, [dispatch])

  useEffect(() => {
    if (customers) {
      const options = customers.map(customer => ({ label: customer.email, value: customer.id }))
      setOptions(options)
    }

    if (user) {
      const products = user?.products.map(product => ({ label: product.name, value: product.id }))
      setProducts(products)
    }

  }, [customers, user]);

  const onChangeCustomer = (e) => {
    const customer = customers.find(customer => customer.id === e.value)
    formRef.current.setFieldValue('user_points', customer?.user_point?.value || 0)
  }

  const onChangeProduct = (e) => {
    const product = user?.products.find(product => product.id === e.value)
    formRef.current.setFieldValue('product_point', product?.point || 0)

    maxQuantity()
  }

  const onChangeQuantity = (e) => {
    const quantity = e.target.value
    const productPoint = formRef.current.getFieldValue('product_point')
    const total = quantity * productPoint
    formRef.current.setFieldValue('total_points', total)
  }

  const onInputQuantity = (e) => {
    const productPoint = formRef.current.getFieldValue('product_point')
    const userPoints = formRef.current.getFieldValue('user_points')

    const quantity = Math.floor(userPoints / productPoint)

    if (e.target.value > quantity) {
      e.target.value = quantity
    }
  }

  const maxQuantity = () => {
    const productPoint = formRef.current.getFieldValue('product_point')
    const userPoints = formRef.current.getFieldValue('user_points')

    const quantity = Math.floor(userPoints / productPoint)

    document.getElementById('quantity').max = quantity
  }

  const handleSubmit = async (data, { reset }) => {
    const schema = Yup.object().shape({
      user_id: Yup.number().required('Cliente é obrigatório'),
      product_id: Yup.number().required('Produto é obrigatório'),
      quantity: Yup.number().required('Quantidade é obrigatório'),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const form_data = {
        id: data.user_id,
        product_user_histories_attributes: [
          data
        ]
      }


      await dispatch(fetchUpdateCustomer(form_data))
        .unwrap()
        .then(async () => {
          toast.success('Troca realizada com sucesso!')
          await dispatch(fetchCurrentUser());
        })
        .catch((error) => {
          toast.error(error.message);
        });

      reset();

    } catch (err) {
      console.log(err)
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
              <h3>Trocar pontos</h3>
            </CCardHeader>
            <CCardBody>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <CFormGroup row>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Selecione um Cliente</CLabel>
                    <SelectInput
                      id="user_id"
                      name="user_id"
                      placeholder="Cliente"
                      options={options}
                      onChange={onChangeCustomer}
                    />
                  </CCol>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Pontuação do cliente</CLabel>
                    <Input id="user_points" name="user_points" placeholder="Pontuação" disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Selecione um Produto</CLabel>
                    <SelectInput
                      id="product_id"
                      name="product_id"
                      placeholder="Cliente"
                      options={products}
                      onChange={onChangeProduct}
                    />
                  </CCol>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Valor de ponto do produto (unidade)</CLabel>
                    <Input id="product_point" name="product_point" placeholder="Pontos" disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Quantidade</CLabel>
                    <Input
                      type="number"
                      id="quantity"
                      name="quantity"
                      placeholder="Quantidade"
                      onChange={onChangeQuantity}
                      onInput={onInputQuantity}
                    />
                  </CCol>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CLabel>Total de descontos</CLabel>
                    <Input type="number" id="total_points" name="total_points" placeholder="Total de descontos" disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CCol lg="4" md="4" sm="12" className="pt-2">
                    <CButton type="submit" color="primary">Trocar</CButton>
                  </CCol>
                </CFormGroup>
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default ExchangeForm;
