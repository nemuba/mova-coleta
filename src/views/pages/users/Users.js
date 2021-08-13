import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../../../store/fetch_actions/users'


const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [pages, setPages] = useState(0)
  const { users } = useSelector(state => state.users)
  const dispatch = useDispatch()

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    dispatch(listUsers())
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
    { key: 'created_at', label: 'Criado em', sorter: true, filter: true },
    { key: 'updated_at', label: 'Atualizado em', sorter: true, filter: true },
  ]

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Usuários
          </CCardHeader>
          <CCardBody>
          <CDataTable
              items={users}
              fields={fields}
            hover
            striped
              tableFilter={{ label: 'Pesquisar:', placeholder: 'Digite o termo da busca' }}
              footer
              sorter
            itemsPerPage={5}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'profile':
                (item)=>(
                  <td>
                    {item?.profile?.name}
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
