import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Collector from 'src/views/users/collector/Collector'
import Business from 'src/views/users/business/Business'
import Customer from 'src/views/users/customer/Customer'


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
