import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
} from '@coreui/react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../../../store/users'
import CIcon from '@coreui/icons-react'
import Modal from './Modal'
import ModalUserPoint from './point/Modal'


const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [pages, setPages] = useState(0)
  const { users, loading } = useSelector(state => state.users)
  const dispatch = useDispatch()

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const totalPages = Math.ceil(users.length / 5)
      setPages(totalPages)
    }
  }, [users])

  const fields = [
    { key: 'profile', label: 'Nome', sorter: true, filter: true },
    { key: 'user_modules', label: 'Módulos', sorter: true, filter: true },
    { key: 'role', label: 'Role', sorter: true, filter: true },
    { key: 'user_point', label: 'Pontos', sorter: true, filter: true },
    { key: 'created_at', label: 'Criado em', sorter: true, filter: true },
    { key: 'updated_at', label: 'Atualizado em', sorter: true, filter: true },
    { key: 'options', label: 'Opções' }
  ]

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h3>Usuários</h3>
          </CCardHeader>
          <CCardBody>
          <CDataTable
              items={users}
              fields={fields}
              loading={loading}
              hover
              striped
              tableFilter={{ label: 'Pesquisar:', placeholder: 'Digite o termo da busca' }}
              footer
              sorter
            itemsPerPage={5}
            activePage={page}
              clickableRows
            scopedSlots = {{
              'profile':
                (item)=>(
                  <td>
                    {item?.profile?.name}
                  </td>
                ),
              'user_point':
                (item) => (
                  <td>
                    {item?.user_point?.value}
                  </td>
                ),
              'user_modules':
                (item) => (
                  <td>
                    {item?.user_modules?.map(({ name }) => name).join(', ')}
                  </td>
                ),
              'created_at':
                (item) => (
                  <td>
                    {item?.created_at}
                  </td>
                ),
              'updated_at':
                (item) => (
                  <td>
                    {item?.updated_at}
                  </td>
                ),
              'options':
                (item) => (
                  <td>
                    <CButton size="sm" color="primary" onClick={() => history.push(`/users/${item.id}`)}>
                      <CIcon name="cil-search" />
                    </CButton>
                    <Modal user={item} title={'Excluir usuário ?'} />
                    <ModalUserPoint user={item} title={'Atualizar Ponto do usuário'} />
                  </td>
                )

            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
              pages={pages}
              doubleArrows={false}
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
