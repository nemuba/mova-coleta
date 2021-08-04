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
import { useDispatch } from 'react-redux'
import { signupFetch } from '../../../store/fetch_actions/auth'
import * as Yup from 'yup'

const Register = () => {
  const dispatch = useDispatch()
  const formRef = useRef(null)

  const handleSubmit = async (data) => {
    console.log(data)
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

      dispatch(signupFetch(data))
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
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Form onSubmit={handleSubmit} ref={formRef}>
                  <h1>Registrar-se</h1>
                  <p className="text-muted">Crie uma conta</p>
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
                  <CButton type="submit" color="success" block>Criar conta</CButton>
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
