import { Avatar, Box, Button, Typography } from '@mui/material'
import { useContext } from 'react'
import { ContextoEvento } from './Contexto'

type Props = {
  profissionais: []
}
export default function SelecionarProfissional(props: Props) {
  const professionais = props.profissionais
  const evento = useContext(ContextoEvento)
  console.log('dentro de Profissional')
  console.log(evento)
  return (
    <Box display={'flex'} gap={3} textAlign={'center'}>
      {professionais.map((profissional) => (
        <Button
          key={profissional.id}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Avatar sx={{ width: 60, height: 60 }}>N</Avatar>
          <Box>{profissional.nome}</Box>
        </Button>
      ))}
    </Box>
  )
}
