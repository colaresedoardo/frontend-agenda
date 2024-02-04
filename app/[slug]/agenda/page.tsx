import { Box } from '@mui/material'

import Contexto from './Contexto'
import ApiServer from '../../fetch/ApiServer'

export default async function Home({ params }: { params: { slug: string } }) {
  const api = new ApiServer()
  const servico = await api.get('servico/', '', {
    grupo__identificador: params.slug,
  })
  const profissionais = await api.get('profissional/', '', {
    grupo__identificador: params.slug,
  })
  const configuracao = await api.get('configuracao/', '', {
    grupo__identificador: params.slug,
  })

  return (
    <Box>
      <Contexto
        servicos={servico}
        profissionais={profissionais}
        configuracao={configuracao}
      ></Contexto>
    </Box>
  )
}
