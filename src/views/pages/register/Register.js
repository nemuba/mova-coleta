import React, { useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Form } from '@unform/web'
import { Input } from '../../../reusable'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useEffect } from 'react'
import { fetchRegisterAuth } from 'src/store/auth'
import { isAuthenticated, login } from 'src/services/auth'
import { updateAction } from 'src/store/profile'
import { toast } from 'react-toastify'
import { push } from 'connected-react-router'

const Register = () => {
  const { loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const formRef = useRef(null)
  const { search } = useSelector(state => state.router.location)

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email().required('Email obrigatório'),
        password: Yup.string().required('Senha Obrigatória'),
        password_confirmation: Yup.mixed().oneOf([Yup.ref('password')], 'Confirmação de Senha Obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await dispatch(fetchRegisterAuth(data))
        .unwrap()
        .then((response) => {
          login(response.headers['access-token'], response.headers['refresh-token']);
          dispatch(updateAction(response.data.profile));
          toast.success('Conta criada com sucesso!');
        })
        .catch(() => {
          toast.error('Erro ao criar o conta!');
        });

      if (isAuthenticated()) {
        dispatch(push('/dashboard'));
      }
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
    if (search && formRef) {
      formRef.current.setData({
        token: search.split('=')[1],
      });
    }
  }, [search, formRef])


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Form onSubmit={handleSubmit} ref={formRef}>
                  <h1>Registrar-se</h1>
                  <p className="text-muted">Crie uma conta</p>
                  <Input id="token" type="text" name="token" hidden />
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <Input id="email" name="email" type="text" placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <Input id="password" name="password" type="password" placeholder="Senha" autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <Input id="password-confirmation" name="password_confirmation" type="password" placeholder="Repita Senha" autoComplete="new-password" />
                  </CInputGroup>
                  <CButton disabled={loading} type="submit" color="success" block>Criar conta</CButton>
                </Form>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton
                      className="btn-facebook mb-1"
                    >
                      <Link to="/login" className="btn-facebook mb-1">Login</Link>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
