import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutFetch } from '../store/fetch_actions/auth'

const TheHeaderDropdown = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutFetch())
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CIcon name="cil-user" size="lg" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>{user?.email}</strong>
        </CDropdownItem>
        <CDropdownItem to="/profile">
          <CIcon name="cil-user" className="mfe-2" />
          Perfil
        </CDropdownItem>
        <CDropdownItem to="/invite">
          <CIcon name="cil-send" className="mfe-2" />
          Convidar
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Sair
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
