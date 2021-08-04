import React, { useEffect, useRef, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CInputGroup, CInputGroupPrepend, CInputGroupText, CLink, CRow } from '@coreui/react'
import { Form } from '@unform/web'
import { Scope } from '@unform/core'
import { useSelector } from 'react-redux'
import { Input } from '../../reusable'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
const User = ({match}) => {
  const { users } = useSelector(state => state.users)
  const [user, setUser] = useState(null)
  const formRef = useRef(null)
  const history = useHistory()

  useEffect(() => {
    if (users && match.params.id) {
      const findUser = users.find(user => user.id === Number(match.params.id))
      if (findUser) {
        setUser(findUser)
      } else {
        toast.warn('Usuário não encontrado')
        history.push(`/users`)
      }
    }
  }, [users, match.params.id, history])

  useEffect(() => {
    if (user) {
      console.log(user)
      formRef.current.setData({
        id: user.id,
        role: user.role,
        profile: {
          id: user?.profile?.id,
          name: user?.profile?.name,
          email: user?.profile?.email,
          phone: user?.profile?.phone,
          document: user?.profile?.document,
          address: {
            id: user?.profile?.address?.id,
            street: user?.profile?.address?.street,
            number: user?.profile?.address?.number,
            neighborhood: user?.profile?.address?.neighborhood,
            city: user?.profile?.address?.city,
            state: user?.profile?.address?.state,
            country: user?.profile?.address?.country,
            zip_code: user?.profile?.address?.zip_code
          }
        }
      });
    }

  }, [user])

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Perfil - Informações do Usuário
          </CCardHeader>
          <CCardBody>
            <Form ref={formRef}>
              <CInputGroup>
                <Input id="id" name="id" hidden />
              </CInputGroup>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText>Tipo do Usuário</CInputGroupText>
                </CInputGroupPrepend>
                <Input id="role" name="role" placeholder="Role" />
              </CInputGroup>
              <Scope path="profile">
                <CInputGroup>
                  <Input id="id" name="id" hidden />
                </CInputGroup>
                <CInputGroup className="mt-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>Nome</CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id="name" name="name" placeholder="Nome" />
                </CInputGroup>
                <CInputGroup className="mt-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>Telefone</CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id="phone" name="phone" placeholder="Telefone" />
                </CInputGroup>
                <CInputGroup className="mt-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>Email</CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id="email" name="email" placeholder="Email" />
                </CInputGroup>
                <CInputGroup className="mt-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>CPF/CNPJ</CInputGroupText>
                  </CInputGroupPrepend>
                  <Input id="document" name="document" placeholder="Documento" />
                </CInputGroup>
                <Scope path="address">
                  <CCard className="mt-3">
                    <CCardHeader>Endereço</CCardHeader>
                    <CCardBody>
                      <CInputGroup>
                        <Input id="id" name="id" hidden />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Número</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="number" name="number" placeholder="Número" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Rua</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="street" name="street" placeholder="Rua" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Bairro</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="neighborhood" name="neighborhood" placeholder="Bairro" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Cidade</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="city" name="city" placeholder="Cidade" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Estado</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="state" name="state" placeholder="Estado" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>Pais</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="country" name="country" placeholder="Pais" />
                      </CInputGroup>
                      <CInputGroup className="mt-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>CEP</CInputGroupText>
                        </CInputGroupPrepend>
                        <Input id="zip_code" name="zip_code" placeholder="CEP" />
                      </CInputGroup>
                    </CCardBody>
                  </CCard>
                </Scope>
              </Scope>
              <CInputGroup className="mt-3">
                <CLink className="text-danger" to="/users">Voltar</CLink>
              </CInputGroup>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
