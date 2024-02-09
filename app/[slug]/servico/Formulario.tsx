'use client'
import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import cadastrarServico from '../../actions/servico/cadastrarServico'

import { useContext, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ContextoServico } from './Contexto'
import { ServicoType } from '../agenda/Contexto'
type Props = {
  slug: string
}

export default function FormularioServico(props: Props) {
  const [sucesso, setSucesso] = useState(false)
  const [fracasso, setFracasso] = useState(false)
  const [loading, setLoading] = useState(false)
  const [messagem, setMessagem] = useState('')
  const servicoContexto = useContext(ContextoServico)
  const { control, handleSubmit } = useForm<ServicoType>({
    values: {
      id: servicoContexto?.servico ? Number(servicoContexto?.servico.id) : 0,
      nome: servicoContexto?.servico ? servicoContexto?.servico.nome : '',
      valor: servicoContexto?.servico ? servicoContexto.servico.valor : '',
    },
  })

  const onSubmitEnviar: SubmitHandler<ServicoType> = async (data) => {
    console.log('aqui')
    console.log(data)
    const formData: FormData = new FormData()
    formData.append('grupo', props.slug)
    formData.append('id', String(data.id))
    formData.append('nome', String(data.nome))
    formData.append('tempo_servico', String(data.tempo_servico))
    formData.append('valor', String(data.valor))
    const resultado = await cadastrarServico(formData)
    console.log(resultado)
    if (resultado['sucesso']) {
      setSucesso(true)
      setLoading(false)
      setMessagem(resultado['messagem'])
    } else {
      setFracasso(true)
      setLoading(false)
      setMessagem(resultado['messagem'])
    }
    setTimeout(() => {
      setSucesso(false)
      setFracasso(false)
    }, 4000)
  }

  // const { pending } = useFormStatus()
  // console.log(pending)
  // console.log('aqui')
  console.log(props.slug)
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      // height={'100vh'}
      gap={1}
      component="form"
      onSubmit={handleSubmit(onSubmitEnviar)}
    >
      <Typography variant="h3">Cadastro de serviço</Typography>
      <FormControl>
        <FormHelperText id="my-helper-text">Nome do Serviço</FormHelperText>

        <Controller
          name="nome"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} value={value}></TextField>
          )}
        ></Controller>
        {/* <TextField
          variant="outlined"
          {...register('nome')}
          value={servicoContexto?.servico ? servicoContexto.servico.nome : ''}
        /> */}
      </FormControl>
      <FormControl>
        <FormHelperText id="my-helper-text">valor do Serviço</FormHelperText>
        <Controller
          name="valor"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} value={value}></TextField>
          )}
        ></Controller>
      </FormControl>
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
        type="submit"
      >
        Salvar
      </LoadingButton>
      {sucesso && <Alert severity="success">{messagem}.</Alert>}
      {fracasso && <Alert severity="error">{messagem} </Alert>}
    </Box>
  )
}
