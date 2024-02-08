import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material'
import { useContext } from 'react'
import { ContextoEvento, ProfissionalType } from './Contexto'

type Props = {
  profissionais: []
}
export default function SelecionarProfissional(props: Props) {
  const professionais: ProfissionalType[] = props.profissionais
  const evento = useContext(ContextoEvento)

  const salvarProfissionalNoContexto = (profissinonal: ProfissionalType) => {
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
  const profissionalSelecionado = evento?.evento.map(
    (evento) => evento.profissional,
  )[0]
  return (
    <Box display={'flex'}>
      <List>
        <ListItem
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {professionais.map((profissional) => (
            <ListItemButton
              key={profissional.id}
              onClick={() => {
                salvarProfissionalNoContexto(profissional)
              }}
              selected={
                profissionalSelecionado
                  ? profissional.id == profissionalSelecionado.id
                  : false
              }
            >
              {profissional.url_image != '' ? (
                <Avatar
                  src={profissional.url_image}
                  sx={{ width: 60, height: 60 }}
                ></Avatar>
              ) : (
                <Avatar sx={{ width: 60, height: 60 }}>
                  {profissional.nome[0]}
                </Avatar>
              )}

              <Typography>{profissional.nome}</Typography>
            </ListItemButton>
          ))}
        </ListItem>
      </List>
    </Box>
  )
}
