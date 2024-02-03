'use client'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

import PassoPassoAgendamento from './Passo'
import { config } from './SelecionarHorario'

type Props = {
  servicos: []
  profissionais: []
  configuracao: config[]
}
export type ServicoType = {
  id: number
  nome?: string
  tempo_servico?: string
  valor?: string
}
export type ProfissionalType = {
  id: number
  nome: string | undefined
}

export type EventoModelo = {
  nome?: string | null
  numero?: string
  servico: ServicoType
  profissional?: ProfissionalType
  data_inicio?: string
  data_fim?: string
  hora?: string
}
type ContextoType = {
  evento: EventoModelo[]
  setEvento: Dispatch<SetStateAction<EventoModelo[]>>
}
export const ContextoEvento = createContext<ContextoType | null>(null)
export default function Contexto(props: Props) {
  const [evento, setEvento] = useState<EventoModelo[]>([{ servico: { id: 0 } }])

  return (
    <ContextoEvento.Provider value={{ evento, setEvento }}>
      <PassoPassoAgendamento
        servicos={props.servicos}
        profissionais={props.profissionais}
        configuracao={props.configuracao}
      />
    </ContextoEvento.Provider>
  )
}
