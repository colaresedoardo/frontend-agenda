'use client'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

import PassoPassoAgendamento from './Passo'
import { Config } from './SelecionarHorario'

type Props = {
  servicos: []
  profissionais: []
  configuracao: Config[]
  identificarCliente: string
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
  url_image?: string
  telefone?: string
}

export type EventoModelo = {
  nome?: string | null
  numero?: string
  servico: ServicoType
  profissional?: ProfissionalType
  data_inicio?: string
  data_fim?: string
  hora?: string
  grupo?: string
}
type ContextoType = {
  evento: EventoModelo[]
  setEvento: Dispatch<SetStateAction<EventoModelo[]>>
  servico: ServicoType
  setServico: Dispatch<SetStateAction<ServicoType>>
}
export const ContextoEvento = createContext<ContextoType | null>(null)
export default function Contexto(props: Props) {
  const [evento, setEvento] = useState<EventoModelo[]>([{ servico: { id: 0 } }])
  const [servico, setServico] = useState<ServicoType>({ id: 0 })
  return (
    <ContextoEvento.Provider value={{ evento, setEvento, servico, setServico }}>
      <PassoPassoAgendamento
        servicos={props.servicos}
        profissionais={props.profissionais}
        configuracao={props.configuracao}
        identificarCliente={props.identificarCliente}
      />
    </ContextoEvento.Provider>
  )
}
