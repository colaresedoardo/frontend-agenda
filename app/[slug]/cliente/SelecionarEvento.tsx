'use client'
import { Box, Grid, TextField } from '@mui/material'
import TabelaClienteComponent from './Tabela'
import { EventoCompletoType } from './page'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import listarEvento from '@/app/actions/cliente/consultarEvento'
import LoadingButton from '@mui/lab/LoadingButton'
import SearchIcon from '@mui/icons-material/Search'
import { diaFormatado, trazerDataFormatoAmericanoTipoDate } from '@/app/utils'
type Props = {
  dados: EventoCompletoType[]
  grupo: string
}
export function SelecionarEvento(props: Props) {
  const [resultadoEventos, setResultadoEventos] =
    useState<EventoCompletoType[]>()
  const eventos = resultadoEventos ? resultadoEventos : props.dados
  const diaAtual = diaFormatado(trazerDataFormatoAmericanoTipoDate(new Date()))
  const { control, handleSubmit } = useForm<EventoCompletoType>({
    values: { data_inicio: diaAtual },
  })
  const onSubmitEnviar: SubmitHandler<EventoCompletoType> = async (data) => {
    const date = data.data_inicio
    const formData: FormData = new FormData()
    formData.append('data_inicio', date)
    formData.append('grupo', props.grupo)
    const resultado = await listarEvento(formData)
    setResultadoEventos(resultado)
  }

  return (
    <Grid container gap={2}>
      <Grid item md={4}>
        <Box
          display={'flex'}
          alignItems={'center'}
          component={'form'}
          onSubmit={handleSubmit(onSubmitEnviar)}
        >
          <Box>
            <Controller
              name="data_inicio"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  type="date"
                  onChange={onChange}
                  value={value}
                ></TextField>
              )}
            ></Controller>
          </Box>
          <Box>
            <LoadingButton
              loadingPosition="start"
              startIcon={<SearchIcon />}
              type="submit"
            ></LoadingButton>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TabelaClienteComponent dados={eventos}></TabelaClienteComponent>
      </Grid>
    </Grid>
  )
}
