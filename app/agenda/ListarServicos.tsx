import { Box, Typography } from '@mui/material'

type Props = {
  servicos: []
}
export default function MostrarServicos(props: Props) {
  console.log(props)
  const servicos = props.servicos
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        // alignItems: 'center',
      }}
    >
      <Typography>Serviços</Typography>
      {servicos.map((servico) => (
        <Typography key={servico.nome}>{servico.nome}</Typography>
      ))}
    </Box>
  )
}
