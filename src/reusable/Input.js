import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { CFormText } from '@coreui/react'
export default function Input({ name, ...rest }) {

  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    })
  }, [fieldName, registerField])

  return (
    <>
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        className={error ? 'form-control is-invalid' : 'form-control'}
        placeholder={error}
        {...rest}
      />
      {error && <CFormText>{error}</CFormText>}
    </>
  )
}
