'use client'
import { createContext, useState } from 'react'

import PassoPassoAgendamento from './Passo'

type Props = {
  servicos: []
  profissionais: []
}
export const ContextoEvento = createContext({})
export default function Contexto(props: Props) {
  const [evento, setEvento] = useState({ teste: 'teset' })

  return (
    <ContextoEvento.Provider value={{ evento }}>
      <PassoPassoAgendamento
        servicos={props.servicos}
        profissionais={props.profissionais}
      />
    </ContextoEvento.Provider>
  )
}
