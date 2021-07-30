import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

import { useSelector } from 'react-redux'

const User = ({match}) => {
  const { users } = useSelector(state => state.users)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (users && match.params.id) {
      setUser(users.find(u => u.id === Number(match.params.id)))
    }
  }, [users, match.params.id])


  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            {user?.profile?.name}
          </CCardHeader>
          <CCardBody>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
