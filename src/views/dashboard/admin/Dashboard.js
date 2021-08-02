import CIcon from '@coreui/icons-react'
import { CCardGroup, CProgress, CWidgetProgressIcon } from '@coreui/react'
import React from 'react'


const Dashboard = ({ users }) => {

  const clients = users.filter(user => user.role === 'customer').length
  const clientsProgress = Math.round(100 * (clients / users.length))
  const collectors = users.filter(user => user.role === 'collector').length
  const collectorsProgress = Math.round(100 * (collectors / users.length))
  const business = users.filter(user => user.role === 'business').length
  const businessProgress = Math.round(100 * (business / users.length))

  return (
    <>
      <CCardGroup className="m-4 ">
        <CWidgetProgressIcon
          header={clients.toString()}
          text="Total de Clientes"
          color="gradient-info"
          progressSlot={<CProgress color="info" size="xs" className="my-3" value={clientsProgress} />}
        >
          <CIcon name="cil-people" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header={collectors.toString()}
          text="Total de Coletores"
          color="gradient-success"
          progressSlot={<CProgress color="success" size="xs" className="my-3" value={collectorsProgress} />}
        >
          <CIcon name="cil-truck" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header={business.toString()}
          text="Total de Comércios"
          color="gradient-warning"
          progressSlot={<CProgress color="warning" size="xs" className="my-3" value={businessProgress} />}
        >
          <CIcon name="cil-basket" height="36" />
        </CWidgetProgressIcon>
      </CCardGroup>
    </>
  )
}

export default Dashboard
