import CIcon from '@coreui/icons-react'
import { CCardGroup, CProgress, CWidgetProgressIcon } from '@coreui/react'
import React from 'react'

const Dashboard = ({ user }) => {

  const totalProducts = user?.products?.length

  return (
    <>
      <CCardGroup className="m-4 ">
        <CWidgetProgressIcon
          header={totalProducts ? totalProducts.toString() : '0'}
          text="Total de produtos"
          color="gradient-info"
          progressSlot={<CProgress color="info" size="xs" className="my-3" value={100} />}
        >
          <CIcon name="cil-recycle" height="36" />
        </CWidgetProgressIcon>
      </CCardGroup>
    </>
  )
}

export default Dashboard

