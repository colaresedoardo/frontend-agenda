import { Box, Card, CardContent, Typography } from '@mui/material'
import { useContext } from 'react'
import { ContextoEvento } from './Contexto'
import { converterData } from '../utils'

export default function ResumoServico() {
  const evento = useContext(ContextoEvento)
  console.log(evento?.evento)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Resumo
        </Typography>

        {evento?.evento.map((event) => (
          <Box key={event.servico.id}>
            {event.servico.id !== 0 && (
              <>
                <Typography>Serviço: {event.servico?.nome}</Typography>
                <Typography>valor: {event.servico?.valor}</Typography>
                <Typography>
                  tempo médio: {event.servico?.tempo_servico}
                </Typography>
              </>
            )}
            {event.data_inicio && (
              <>
                <Typography>dia: {converterData(event.data_inicio)}</Typography>
              </>
            )}

            {event.hora && (
              <>
                <Typography>horário: {event.hora}</Typography>
              </>
            )}
            {event.profissional && (
              <>
                <Typography>profissional: {event.profissional.nome}</Typography>
              </>
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}
