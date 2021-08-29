import CIcon from '@coreui/icons-react'
import { CCardGroup, CProgress, CWidgetProgressIcon } from '@coreui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCollects } from '../../../store/collects'
import { fetchAllRoutes } from '../../../store/routes'


const Dashboard = ({ users }) => {
  const dispatch = useDispatch(null)
  const clients = users.filter(user => user.role === 'customer').length
  const clientsProgress = Math.round(100 * (clients / users.length))
  const collectors = users.filter(user => user.role === 'collector').length
  const collectorsProgress = Math.round(100 * (collectors / users.length))
  const business = users.filter(user => user.role === 'business').length
  const businessProgress = Math.round(100 * (business / users.length))
  const { collects } = useSelector(state => state.collects)
  const { routes } = useSelector(state => state.routes)
  const [totalCollects, setTotalCollects] = useState(0)
  const [totalRoutes, setTotalRoutes] = useState(0)

  useEffect(() => {
    dispatch(fetchAllCollects())
    dispatch(fetchAllRoutes())
  }, [dispatch])

  useEffect(() => {
    if (collects)
      setTotalCollects(collects.length)
  }, [collects])

  useEffect(() => {
    if (routes)
      setTotalRoutes(routes.length)
  }, [routes])

  return (
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
        color="gradient-primary"
        progressSlot={<CProgress color="primary" size="xs" className="my-3" value={collectorsProgress} />}
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
      <CWidgetProgressIcon
        header={totalCollects.toString()}
        text="Total de Coletas"
        color="gradient-success"
        progressSlot={<CProgress color="success" size="xs" className="my-3" value={100} />}
      >
        <CIcon name="cil-recycle" height="36" />
      </CWidgetProgressIcon>
      <CWidgetProgressIcon
        header={totalRoutes.toString()}
        text="Total de Rotas"
        color="gradient-secondary"
        progressSlot={<CProgress color="secondary" size="xs" className="my-3" value={100} />}
      >
        <CIcon name="cil-location-pin" height="36" />
      </CWidgetProgressIcon>
      </CCardGroup>

  )
}

export default Dashboard
