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
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoginAuth } from '../../../store/auth'
import { updateAction } from '../../../store/profile'
import { login, isAuthenticated } from '../../../services/auth'
import { toast } from 'react-toastify'
import { push } from 'connected-react-router'

const Login = () => {
  const { loading } = useSelector(state => state.auth)
  const dispatch = useDispatch(null)
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

      await dispatch(fetchLoginAuth(data))
        .unwrap()
        .then((response) => {
          login(response.headers['access-token'], response.headers['refresh-token']);
          dispatch(updateAction(response.data.profile));
          toast.success('Login realizado com sucesso!');
        })
        .catch(() => {
          toast.error('Usuário o senha inválido!');
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
                        <CButton disabled={loading} color="primary" className="px-4" type="submit">Entrar</CButton>
                      </CCol>
                    </CRow>
                  </Form>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="d-flex align-items-between flex-column">
                  <CCol sm="12" lg="12" xs="12" className="text-center">
                    <h2>Criar conta</h2>
                    <p>Ainda não criou sua conta ?</p>
                  </CCol>
                  <CCol sm="12" lg="12" xs="12" className="text-center">
                    <Link to="/register">
                      <CButton color="primary" className="mb-3" active tabIndex={-1}>Registrar-se</CButton>
                    </Link>
                  </CCol>
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
