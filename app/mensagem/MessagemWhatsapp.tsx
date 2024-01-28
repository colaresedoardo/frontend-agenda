'use client'
import { Box, Button, TextField } from '@mui/material'
import enviarMensagem from '../actions/servico/enviarMensagem'

export default function MensagemWhatsapp() {
  return (
    <Box component={'form'} action={enviarMensagem}>
      <TextField required label="numero" sx={{ width: '50vh' }} name="numero" />
      <TextField
        required
        name="menssagem"
        label="Menssagem"
        sx={{ width: '50vh' }}
        type="text"
      />
      <Button type={'submit'}>enviar</Button>
    </Box>
  )
}
