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
type Props = {
  servicos: []
}
export default function MostrarServicos(props: Props) {
  console.log(props)
  const servicos = props.servicos
  return (
    <>
      <Typography variant="h4">Serviços</Typography>
      <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
        <List>
          {servicos.map((servico) => (
            <ListItem key={servico.nome}>
              <ListItemButton>
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
