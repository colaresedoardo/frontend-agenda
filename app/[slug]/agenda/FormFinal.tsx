'use client'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'

export default function FormFinal() {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={1} flexWrap={'wrap'}>
      <Typography>Digite seus dados para a equipe entrar em contato</Typography>
      <TextField required name="nome" label="Nome" type="text" />
      <TextField
        required
        label="numero"
        name="numero"
        InputProps={{
          startAdornment: <InputAdornment position="start">+55</InputAdornment>,
        }}
      />
    </Box>
  )
}
