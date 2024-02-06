'use client'
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import authUser from '../actions/autenticacao'
import { useCallback, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'

export default function Page() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
  }))
  const [error, setError] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const loginButton = useCallback(async (formData: FormData) => {
    const resultado = await authUser(formData)
    if (resultado.sucesso) {
      redirect(`/${resultado.linkPagina}`)
    } else {
      setError(true)
      setMensagem(
        `Erro ao realizar o login.
        Verifique se suas credenciais estão corretas.
        Qualquer dúvida entre em contato com o admininistrador
        `,
      )
    }
    setTimeout(() => {
      setError(false)
    }, 6000)
  }, [])

  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
        <Item>Login</Item>
        <Box
          component="form"
          display={'flex'}
          flexDirection={'column'}
          justifyContent="center"
          alignItems="center"
          gap={1}
          sx={{ minHeight: '50vh' }}
          action={loginButton}
          // onSubmit={loginButton}
        >
          <TextField
            required
            label="Login"
            sx={{ width: '50vh' }}
            name="user"
          />
          <TextField
            required
            label="Senha"
            sx={{ width: '50vh' }}
            type="password"
            name="password"
          />
          <Button type="submit" variant="text">
            Enviar
          </Button>
          {error && (
            <Alert severity="error">
              <Typography> {mensagem}</Typography>
            </Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
