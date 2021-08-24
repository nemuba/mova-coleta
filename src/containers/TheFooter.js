import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; 2020 M.O.V.A - Coleta.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
