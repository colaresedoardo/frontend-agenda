'use client'
import { Box, Button, Grid, Paper, TextField, styled } from '@mui/material'
import authUser from '../actions/autenticacao'

export default function Page() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
  }))
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
          action={authUser}
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
        </Box>
      </Grid>
    </Grid>
  )
}
