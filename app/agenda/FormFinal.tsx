'use client'
import { Box, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'

export default function FormFinal() {
  const [formulario, setFormulario] = useState({
    nome: '',
    numero: '',
    // Outros campos do formulário...
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }))
  }
  console.log('dentro form')
  console.log(formulario)
  return (
    <Box>
      <TextField
        required
        name="nome"
        label="Nome"
        sx={{ width: '50vh' }}
        type="text"
        onChange={handleChange}
      />
      <TextField
        required
        label="numero"
        sx={{ width: '50vh' }}
        name="numero"
        InputProps={{
          startAdornment: <InputAdornment position="start">+55</InputAdornment>,
        }}
        onChange={handleChange}
      />
    </Box>
  )
}
