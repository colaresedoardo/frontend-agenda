import { Box, List, ListItem, ListItemButton, Typography } from '@mui/material'

import { useContext } from 'react'
import { ContextoEvento } from './Contexto'
import { useTheme } from '@emotion/react'
type Props = {
  servicos: []
}
export default function MostrarServicos(props: Props) {
  const servicos = props.servicos
  const theme = useTheme()
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
  const idServico = evento?.evento.map((e) => e.servico.id)
  console.log(idServico)
  return (
    <>
      <Typography variant="h4" color={theme.palette.primary.main}>
        Serviços
      </Typography>
      <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
        <List>
          {servicos.map((servico) => (
            <ListItem key={servico.nome}>
              <ListItemButton
                onClick={() => {
                  salvarServicoNoContexto(servico)
                }}
                selected={idServico == servico.id}
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
