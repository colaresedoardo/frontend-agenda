import { Box, Step, StepLabel, Stepper } from '@mui/material'

import PassoPassoAgendamento from './Passo'
import ApiClient from '../fetch/ApiClient'

export default async function Home() {
  const api = new ApiClient()
  const resultado = await api.get('servico/')
  console.log(resultado)
  return (
    <Box>
      <PassoPassoAgendamento servicos={resultado}></PassoPassoAgendamento>
    </Box>
  )
}
