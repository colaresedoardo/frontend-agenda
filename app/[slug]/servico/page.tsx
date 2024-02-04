import { Grid, Typography } from '@mui/material'

import listarServico from '../../actions/servico/listarServico'

import TabelaComponent from './Tabela'

import FormularioServico from './Formulario'

export default async function Page() {
  const data = await listarServico()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FormularioServico></FormularioServico>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h4">Lista dos serviços</Typography>
        <TabelaComponent dados={data}></TabelaComponent>
      </Grid>
    </Grid>
  )
}
