import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardGroup, CCardHeader, CProgress, CWidgetProgressIcon } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { currentUserFetch } from 'src/store/fetch_actions/auth'


const Dashboard = ({ user }) => {

  const lastCollect = user?.collects[user.collects.length - 1]
  const totalCollects = user?.collects?.length
  const userPoints = user?.user_point?.value
  const dispatch = useDispatch()

  const name = 'Aguardando Confirmação'

  useEffect(() => {
    dispatch(currentUserFetch())
  }, [dispatch])

  return (
    <>
      <CCardGroup className="m-4 ">
        <CWidgetProgressIcon
          header={userPoints != null ? userPoints.toString() : '0'}
          text="Total de pontos"
          color="gradient-info"
          progressSlot={<CProgress color="info" size="xs" className="my-3" value={100} />}
        >
          <CIcon name="cil-recycle" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header={totalCollects != null ? totalCollects.toString() : '0'}
          text="Total de coletas"
          color="gradient-info"
          progressSlot={<CProgress color="success" size="xs" className="my-3" value={100} />}
        >
          <CIcon name="cil-truck" height="36" />
        </CWidgetProgressIcon>
        {
          lastCollect?.collect_status !== null && lastCollect?.collect_status?.name === name ? (
            <CCard>
              <CCardHeader>Solicitação de Coleta</CCardHeader>
              <CCardBody>
                <p>Ultima solicitação: {lastCollect?.created_at} </p>
                <p>Status: {lastCollect?.collect_status?.name}</p>
              </CCardBody>
            </CCard>
          ) : (
            <CCard>
              <CCardHeader>Solicitação de Coleta</CCardHeader>
              <CCardBody>
                <p>Não há solicitações de coletas pendentes </p>
              </CCardBody>
            </CCard>
          )
        }
      </CCardGroup>
    </>
  )
}

export default Dashboard

