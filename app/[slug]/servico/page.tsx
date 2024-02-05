import { Grid, Typography } from '@mui/material'

import listarServico from '../../actions/servico/listarServico'

import TabelaComponent from './Tabela'

import FormularioServico from './Formulario'
import { cookies } from 'next/headers'

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const grupo = cookies().get('grupo')?.value
    ? cookies().get('grupo')?.value
    : ''
  const data = await listarServico(grupo!)

  console.log('grupo')
  console.log(grupo)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FormularioServico slug={slug}></FormularioServico>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h4">Lista dos serviços</Typography>
        <TabelaComponent dados={data}></TabelaComponent>
      </Grid>
    </Grid>
  )
}
