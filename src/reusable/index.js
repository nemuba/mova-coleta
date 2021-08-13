import React from 'react';
import { retry } from '../services/functions';

const DocsLink = React.lazy(() => retry(() => import('./DocsLink')))
const ProtectedRouter = React.lazy(() => retry(() => import('./ProtectedRouter')))
const Input = React.lazy(() => retry(() => import('./Input')))
const InputPhone = React.lazy(() => retry(() => import('./InputPhone')))
const SelectInput = React.lazy(() => retry(() => import('./SelectInput')))
const TextArea = React.lazy(() => retry(() => import('./TextArea')))

export {
  DocsLink,
  ProtectedRouter,
  Input,
  InputPhone,
  SelectInput,
  TextArea,
}
