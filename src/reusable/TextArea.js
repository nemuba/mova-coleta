import { CFormText } from '@coreui/react'
import { useField } from '@unform/core'
import React, { useEffect, useRef } from 'react'

export default function TextArea({ name, ...rest }) {

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
      <textarea
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
