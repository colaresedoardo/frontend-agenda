'use client'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import { EventoCompletoType } from './page'
import { converterData, converterIniciaisMaiusculas } from '@/app/utils'

type Props = {
  dados: EventoCompletoType[]
}

export default function TabelaClienteComponent(props: Props) {
  const dados = props.dados

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ overflow: 'auto', maxWidth: '100%' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>numero</TableCell>
              <TableCell>horário</TableCell>
              <TableCell>profissional</TableCell>
              <TableCell>serviço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dados.map((dado) => (
              <TableRow key={dado.horario}>
                <TableCell>
                  <Typography>
                    {converterIniciaisMaiusculas(
                      dado.cliente ? dado.cliente?.nome : '',
                    )}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{dado.cliente?.telefone}</Typography>
                </TableCell>

                <TableCell>
                  {' '}
                  <Typography>{dado.horario}</Typography>
                </TableCell>
                <TableCell>
                  {' '}
                  <Typography>{dado.profissional?.nome}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{dado.servico?.nome}</Typography>{' '}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
