import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Form } from '@unform/web'
import logo from '../../../assets/images/logo.png'
import * as Yup from 'yup'
import { Input } from  '../../../reusable'
import { useDispatch } from 'react-redux'
import { loginFetch } from '../../../store/fetch_actions/auth'

const Login = () => {
  const dispatch = useDispatch()
  const formRef = useRef(null)

  const handleSubmit = async (data, { reset }) => {
    try{
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required('Email obrigatório'),
        password: Yup.string()
          .min(6)
          .required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(loginFetch(data))
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
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <img src={logo} alt="logo" className="logo" />
                    <p className="text-muted">Entrar</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <Input id="email" name="email" type="text" placeholder="Email" autoComplete="Email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <Input id="password" name="password" type="password" placeholder="Senha" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type="submit">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </Form>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Criar conta</h2>
                    <p>Ainda não criou sua conta ?</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Registrar-se</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
