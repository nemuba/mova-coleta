import CIcon from '@coreui/icons-react'
import { CBadge, CCard, CCardBody, CCardGroup, CCardHeader, CProgress, CWidgetProgressIcon } from '@coreui/react'

const Dashboard = ({ user }) => {

  const lastRoute = user?.routes[user?.routes?.length - 1]
  const totalRoutes = user?.routes?.length

  const getBadge = (status) => {
    switch (status) {
      case 'Coletado': return 'success'
      case 'Aguardando Coleta': return 'warning'
      case 'Aguardando Confirmação': return 'danger'
      default: return 'primary'
    }
  }

  return (
    <>
      <CCardGroup className="m-4 ">
        <CWidgetProgressIcon
          header={totalRoutes != null ? totalRoutes.toString() : '0'}
          text="Total de rotas"
          color="gradient-info"
          progressSlot={<CProgress color="success" size="xs" className="my-3" value={100} />}
        >
          <CIcon name="cil-truck" height="36" />
        </CWidgetProgressIcon>
        {
          lastRoute !== null ? (
            <CCard>
              <CCardHeader>Solicitação de Coleta</CCardHeader>
              <CCardBody>
                <p>Ultima solicitação: {lastRoute?.created_at} </p>
                <p>Status:
                  <CBadge color={getBadge(lastRoute?.status)} className="ml-2 p-2">
                    {lastRoute?.status}
                  </CBadge>
                </p>
              </CCardBody>
            </CCard>
          ) : (
            <CCard>
              <CCardHeader>Ultima rota</CCardHeader>
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

