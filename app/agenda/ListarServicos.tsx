import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import { useContext } from 'react'
import { ContextoEvento } from './Contexto'
type Props = {
  servicos: []
}
export default function MostrarServicos(props: Props) {
  console.log(props)
  const servicos = props.servicos
  const evento = useContext(ContextoEvento)
  const salvarServicoNoContexto = (servico) => {
    const dataPreenchida = evento?.evento.map((evento) => evento.data_inicio)[0]
    const profissional = evento?.evento.map((evento) => evento.profissional)[0]
    const horario = evento?.evento.map((evento) => evento.hora)[0]
    evento?.setEvento([
      {
        servico: {
          id: servico.id,
          nome: servico.nome,
          valor: servico.valor,
          tempo_servico: servico.tempo_servico,
        },
        data_inicio: dataPreenchida!,
        profissional: profissional,
        hora: horario,
      },
    ])
  }
  console.log('evento')
  console.log(evento)
  return (
    <>
      <Typography variant="h4">Serviços</Typography>
      <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
        <List>
          {servicos.map((servico) => (
            <ListItem key={servico.nome}>
              <ListItemButton
                onClick={() => {
                  salvarServicoNoContexto(servico)
                }}
              >
                <Box display={'flex'} flexDirection={'column'}>
                  <Box display={'flex'} gap={1} alignItems={'center'}>
                    <Box>
                      {' '}
                      <Typography variant="h6">{servico.nome}</Typography>{' '}
                    </Box>
                    <Box>
                      {' '}
                      <Typography>{servico.valor} reais</Typography>{' '}
                    </Box>
                  </Box>
                  <Box>{servico.tempo_servico} min</Box>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  )
}
