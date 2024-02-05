import { Box } from '@mui/material'

import Contexto from './Contexto'
import ApiServer from '../../fetch/ApiServer'
// import { cookies } from 'next/headers'

export default async function Home({ params }: { params: { slug: string } }) {
  const api = new ApiServer()
  // const grupo = cookies().get('grupo')?.value
  const grupo = params.slug
  const servico = await api.get('servico/', '', {
    grupo__identificador: grupo!,
  })
  const profissionais = await api.get('profissional/', '', {
    grupo__identificador: grupo!,
  })
  const configuracao = await api.get('configuracao/', '', {
    grupo__identificador: grupo!,
  })
  const identificarCliente = grupo!
  return (
    <Box>
      <Contexto
        servicos={servico}
        profissionais={profissionais}
        configuracao={configuracao}
        identificarCliente={identificarCliente}
      ></Contexto>
    </Box>
  )
}
