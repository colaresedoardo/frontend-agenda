import { Avatar, Box, Button, Typography } from '@mui/material'
import { useContext } from 'react'
import { ContextoEvento } from './Contexto'

type Props = {
  profissionais: []
}
export default function SelecionarProfissional(props: Props) {
  const professionais = props.profissionais
  const evento = useContext(ContextoEvento)

  const salvarProfissionalNoContexto = (profissinonal) => {
    const servicoAnterior = evento?.evento.map((evento) => evento.servico)[0]
    const dataAnterior = evento?.evento.map((evento) => evento.data_inicio)[0]
    const horario = evento?.evento.map((evento) => evento.hora)[0]
    evento?.setEvento([
      {
        servico: servicoAnterior!,
        data_inicio: dataAnterior,
        profissional: { id: profissinonal.id, nome: profissinonal.nome },
        hora: horario,
      },
    ])
  }
  return (
    <Box display={'flex'} gap={3} textAlign={'center'}>
      {professionais.map((profissional) => (
        <Button
          key={profissional.id}
          sx={{ display: 'flex', flexDirection: 'column' }}
          onClick={() => {
            salvarProfissionalNoContexto(profissional)
          }}
        >
          <Avatar sx={{ width: 60, height: 60 }}>N</Avatar>
          <Box>{profissional.nome}</Box>
        </Button>
      ))}
    </Box>
  )
}
