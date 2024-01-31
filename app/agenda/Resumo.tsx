import { Box, Card, CardContent, Typography } from '@mui/material'
import { useContext } from 'react'
import { ContextoEvento } from './Contexto'
import { converterData } from '../utils'
import { useTheme } from '@emotion/react'

export default function ResumoServico() {
  const evento = useContext(ContextoEvento)
  const theme = useTheme()
  return (
    <Card
      sx={{
        // maxWidth: 345,
        height: '245px',
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <CardContent sx={{}}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          color={theme.palette.info.main}
        >
          Resumo
        </Typography>

        {evento?.evento.map((event) => (
          <Box key={event.servico.id}>
            {event.servico.id !== 0 && (
              <>
                <Box display={'flex'} gap={1} color={theme.palette.info.main}>
                  Serviço:{' '}
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                    }}
                    color={theme.palette.info.main}
                  >
                    {event.servico?.nome}
                  </Typography>
                </Box>
                <Box display={'flex'} gap={1} color={theme.palette.info.main}>
                  valor:
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                    }}
                    color={theme.palette.info.main}
                  >
                    {event.servico?.valor}
                  </Typography>
                </Box>
                <Box display={'flex'} gap={1} color={theme.palette.info.main}>
                  tempo médio:
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                    }}
                    color={theme.palette.info.main}
                  >
                    {event.servico?.tempo_servico} minutos
                  </Typography>
                </Box>
              </>
            )}
            {event.data_inicio && (
              <>
                <Box display={'flex'} gap={1} color={theme.palette.info.main}>
                  dia:
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                    }}
                    color={theme.palette.info.main}
                  >
                    {converterData(event.data_inicio)}
                  </Typography>
                </Box>
              </>
            )}

            {event.hora && (
              <>
                <Box display={'flex'} gap={1} color={theme.palette.info.main}>
                  horário:
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                    }}
                    color={theme.palette.info.main}
                  >
                    {event.hora}
                  </Typography>
                </Box>
              </>
            )}
            {event.profissional && (
              <>
                <Box display={'flex'} gap={1} color={theme.palette.info.main}>
                  profissional:
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                    }}
                    color={theme.palette.info.main}
                  >
                    {event.profissional.nome}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}
