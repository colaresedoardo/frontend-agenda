'use client'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

import PassoPassoAgendamento from './Passo'

type Props = {
  servicos: []
  profissionais: []
}
type ServicoType = {
  id: number
  nome?: string
  tempo_servico?: string
  valor?: string
}
type ProfissionalType = {
  id: number
  nome: string
}

export type EventoModelo = {
  nome: string
  numero: string
  servico: ServicoType
  profissional?: ProfissionalType
  data_inicio?: string
  data_fim?: string
  hora?: string
  titulo?: string
}
type ContextoType = {
  evento: EventoModelo[]
  setEvento: Dispatch<SetStateAction<EventoModelo[]>>
}
export const ContextoEvento = createContext<ContextoType | undefined>(undefined)
export default function Contexto(props: Props) {
  const [evento, setEvento] = useState<EventoModelo[]>([{ servico: { id: 0 } }])

  return (
    <ContextoEvento.Provider value={{ evento, setEvento }}>
      <PassoPassoAgendamento
        servicos={props.servicos}
        profissionais={props.profissionais}
      />
    </ContextoEvento.Provider>
  )
}
