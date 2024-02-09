'use client'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { ServicoType } from '../agenda/Contexto'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useContext } from 'react'
import { ContextoServico } from './Contexto'

type Props = {
  dados: ServicoType[]
}
export default function TabelaComponent(props: Props) {
  const dados = props.dados
  const servicoContexto = useContext(ContextoServico)
  function alterarDados(dado: ServicoType) {
    const nome = dado.nome
    console.log('alterar')
    console.log(nome)
    console.log('lista')
    console.log(servicoContexto)
    servicoContexto?.setServico(dado)
    // if (!evento?.servico) {
    //   evento?.setServico(dado)
    // }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Tempo serviço</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dados.map((dado) => (
            <TableRow key={dado.id}>
              <TableCell>{dado.nome}</TableCell>
              <TableCell>{dado.valor}</TableCell>
              <TableCell>{dado.tempo_servico}</TableCell>
              <TableCell
                sx={{ '&:hover': { cursor: 'pointer' } }}
                onClick={() => alterarDados(dado)}
              >
                <EditIcon color="secondary"></EditIcon>
              </TableCell>
              <TableCell sx={{ '&:hover': { cursor: 'pointer' } }}>
                <DeleteForeverIcon color={'primary'}></DeleteForeverIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
