import CIcon from '@coreui/icons-react';
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormGroup, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, TextArea } from '../../../../reusable';
import Notification from './Notification';
import { createCollect } from '../../../../store/fetch_actions/collects'
import * as Yup from 'yup';
import { fetchCurrentUser } from '../../../../store/auth';
import { push } from 'connected-react-router';
import { updateAction } from 'src/store/profile';

const FormCollect = () => {
  const formRef = useRef(null)
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.profile)
  const [notification, setNotification] = useState(profile === null)

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        user_id: Yup.string().required(),
        note: Yup.string().required('Descrição obrigatória'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      const { user_id, note } = data

      const collect = {
        user_id,
        note,
        collect_status_attributes: { name: 'Aguardando Confirmação' }
      }

      dispatch(createCollect(collect))
      await dispatch(fetchCurrentUser())
        .unwrap()
        .then(res => dispatch(updateAction(res.data.profile)))
      dispatch(push('/collects'))

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

  useEffect(() => {
    if (profile) {
      formRef.current.setData({
        user_id: profile?.user_id,
        street: profile?.address?.street,
        number: profile?.address?.number,
        city: profile?.address?.city,
        neighborhood: profile?.address?.neighborhood,
      });

      setNotification(profile?.address === null)
    }

  }, [profile])

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h2>Dados da solicitação de Coleta</h2>
              {notification ? <Notification /> : null}
            </CCardHeader>
            <CCardBody>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <Input id="user_id" name="user_id" hidden />
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>Rua</CInputGroupText>
                    </CInputGroupPrepend>
                    <Input placeholder="Rua" type="text" id="street" name="street" autoComplete="Rua" disabled />
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>Número</CInputGroupText>
                    </CInputGroupPrepend>
                    <Input placeholder="Número" type="text" id="number" name="number" autoComplete="Número" disabled />
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>Bairro</CInputGroupText>
                    </CInputGroupPrepend>
                    <Input placeholder="Bairro" type="text" id="neighborhood" name="neighborhood" autoComplete="Bairro" disabled />
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>Cidade</CInputGroupText>
                    </CInputGroupPrepend>
                    <Input placeholder="Cidade" type="text" id="city" name="city" autoComplete="Cidade" disabled />
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-location-pin" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Observação</CLabel>
                  <TextArea id="note" name="note" rows="9" placeholder="Observação" disabled={notification} />
                </CFormGroup>
                <CButtonGroup>
                  <CButton
                    type="submit"
                    color="primary"
                    disabled={notification}
                  >Criar Solicitação</CButton>
                </CButtonGroup>
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default FormCollect;
