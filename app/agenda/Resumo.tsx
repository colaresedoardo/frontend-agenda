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
        maxWidth: 345,
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
                <Typography
                  sx={{
                    fontWeight: 'bold',
                  }}
                  color={theme.palette.info.main}
                >
                  valor: {event.servico?.valor}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                  }}
                  color={theme.palette.info.main}
                >
                  tempo médio: {event.servico?.tempo_servico}
                </Typography>
              </>
            )}
            {event.data_inicio && (
              <>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                  }}
                  color={theme.palette.info.main}
                >
                  dia: {converterData(event.data_inicio)}
                </Typography>
              </>
            )}

            {event.hora && (
              <>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                  }}
                  color={theme.palette.info.main}
                >
                  horário: {event.hora}
                </Typography>
              </>
            )}
            {event.profissional && (
              <>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                  }}
                  color={theme.palette.info.main}
                >
                  profissional: {event.profissional.nome}
                </Typography>
              </>
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}
