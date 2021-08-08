import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Collector = React.lazy(() => import('./collector/Collector'))
const Business = React.lazy(() => import('./business/Business'))
const Customer = React.lazy(() => import('./customer/Customer'))

const NewUser = () => {

  const [active, setActive] = useState(0)

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Cadastrar Usuário
          </CCardHeader>
          <CCardBody>
            <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-truck" />
                    {' Cadastrar Coletor'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-briefcase" />
                    {' Cadastrar Empresa'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-user" />
                    {' Cadastrar Cliente'}
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <Collector />
                </CTabPane>
                <CTabPane>
                  <Business />
                </CTabPane>
                <CTabPane>
                  <Customer />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default NewUser
