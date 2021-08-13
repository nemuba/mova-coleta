import React from 'react'
import { Link } from 'react-router-dom'

const Notification = () => {
  return(
    <p>
      Para solicitar um coleta é necessário que tenha endereço cadastrado:
      <Link to="/profile">Atualizar perfil</Link>
    </p>
  )
  }

export default Notification







