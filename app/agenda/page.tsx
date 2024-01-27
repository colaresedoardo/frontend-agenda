import { Box, Step, StepLabel, Stepper } from '@mui/material'

import PassoPassoAgendamento from './Passo'
import ApiClient from '../fetch/ApiClient'
import Contexto from './Contexto'

export default async function Home() {
  const api = new ApiClient()
  const resultado = await api.get('servico/')
  const profissionais = await api.get('profissional/')
  console.log(resultado)
  return (
    <Box>
      <Contexto servicos={resultado} profissionais={profissionais}></Contexto>
    </Box>
  )
}
