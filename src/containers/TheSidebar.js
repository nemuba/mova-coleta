import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSlide } from '../store/sidebar'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from '@coreui/react'

import sygnet from '../assets/images/mova.svg'
import logo from '../assets/images/logo.svg'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const { sidebarShow } = useSelector(state => state.sidebarShow)
  const { user } = useSelector(state => state.auth)

  return (
    <CSidebar
      show={sidebarShow}
      onShowChange={(val) => dispatch(setSlide(val))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CImg src={logo} className="c-sidebar-brand-full" height={45} />
        <CImg src={sygnet} className="c-sidebar-brand-minimized" height={45} width={45} />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation[user?.role]}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
