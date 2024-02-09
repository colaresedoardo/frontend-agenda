'use client'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

import { ServicoType } from '../agenda/Contexto'
import { Grid, Typography } from '@mui/material'
import FormularioServico from './Formulario'
import TabelaComponent from './Tabela'

type ContextoType = {
  servico: ServicoType
  setServico: Dispatch<SetStateAction<ServicoType>>
}
export const ContextoServico = createContext<ContextoType | null>(null)
type Props = {
  slug: string
  data: ServicoType[]
}
export default function ContextoServicoComponent(props: Props) {
  const [servico, setServico] = useState<ServicoType>({ id: 0 })
  return (
    <ContextoServico.Provider value={{ servico, setServico }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormularioServico slug={props.slug}></FormularioServico>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4">Lista dos serviços</Typography>
          <TabelaComponent dados={props.data}></TabelaComponent>
        </Grid>
      </Grid>
    </ContextoServico.Provider>
  )
}
