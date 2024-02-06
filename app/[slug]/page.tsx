import { Box, Typography } from '@mui/material'

export default function Page() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignContent={'center'}
      alignItems={'center'}
    >
      <Typography>Olá, bem vindo ao sistema de agendamento.</Typography>
      <Typography>
        Ainda estão sendo desenvolvidos novos módulos que serão disponibilizados
        conforme a necessidade de nossos clientes
      </Typography>
    </Box>
  )
}
