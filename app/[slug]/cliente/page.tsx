import ApiServer from '@/app/fetch/ApiServer'
import { Box } from '@mui/material'
import { ClienteType, ProfissionalType, ServicoType } from '../agenda/Contexto'

import { diaFormatado, trazerDataFormatoAmericanoTipoDate } from '@/app/utils'
import { SelecionarEvento } from './SelecionarEvento'

export type EventoCompletoType = {
  data_inicio: string
  servico?: ServicoType
  profissional?: ProfissionalType
  cliente?: ClienteType
  horario?: string
}
export default async function Page({ params }: { params: { slug: string } }) {
  const grupo = params.slug
  const api = new ApiServer()
  const hoje = diaFormatado(trazerDataFormatoAmericanoTipoDate(new Date()))
  const eventos: EventoCompletoType[] = await api.get('evento/', '', {
    grupo__identificador: grupo!,
    data_inicio: hoje,
  })

  return (
    <Box>
      <SelecionarEvento dados={eventos} grupo={grupo}></SelecionarEvento>
    </Box>
  )
}
