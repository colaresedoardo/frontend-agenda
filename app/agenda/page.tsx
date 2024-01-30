import { Box } from '@mui/material'

import Contexto from './Contexto'
import ApiServer from '../fetch/ApiServer'

export default async function Home() {
  const api = new ApiServer()
  const resultado = await api.get('servico/')
  const profissionais = await api.get('profissional/')
  const configuracao = await api.get('configuracao/')
  return (
    <Box>
      <Contexto
        servicos={resultado}
        profissionais={profissionais}
        configuracao={configuracao}
      ></Contexto>
    </Box>
  )
}
