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
import { useFormStatus } from 'react-dom'
import { useState } from 'react'
export default function FormularioServico() {
  const [sucesso, setSucesso] = useState(false)
  const [fracasso, setFracasso] = useState(false)
  const [loading, setLoading] = useState(false)
  const [messagem, setMessagem] = useState('')
  async function clientAction(formData: FormData) {
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
  const { pending } = useFormStatus()
  console.log(pending)
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      // height={'100vh'}
      component="form"
      action={clientAction}
    >
      <Typography variant="h3">Cadastro de serviço</Typography>
      <FormControl>
        <TextField
          multiline
          rows={5}
          name="descricao_modelo_ia"
          variant="outlined"
        />
        <FormHelperText id="my-helper-text">
          Por exemplo: inserir produto x, valor y
        </FormHelperText>
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
