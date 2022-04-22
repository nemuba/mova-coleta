import React from 'react'
import { Link } from 'react-router-dom'

const Notification = () => {
  return(
    <p className="text-danger">
      Para solicitar um coleta é necessário que tenha endereço cadastrado:
      <Link to="/profile" className="ml-3">Atualizar perfil</Link>
    </p>
  )
  }

export default Notification







