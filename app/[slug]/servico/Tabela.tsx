'use client'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { ServicoType } from '../agenda/Contexto'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useCallback, useContext, useState } from 'react'
import { ContextoServico } from './Contexto'

import excluirServico from '@/app/actions/servico/excluirServico'

type Props = {
  dados: ServicoType[]
}
// const styleModal = {
//   position: 'absolute' as const,
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   // border: '1px solid #000',
//   boxShadow: 24,
//   p: 4,
// }
export default function TabelaComponent(props: Props) {
  const dados = props.dados
  const servicoContexto = useContext(ContextoServico)
  const [open, setOpen] = useState(false)
  const [registroSelecionado, setRegistroSelecionado] = useState<ServicoType>()
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
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = (dado: ServicoType) => {
    setRegistroSelecionado(dado)
    setOpen(true)
  }
  const onExcluirServico = useCallback(async (id: number) => {
    console.log('exluir')

    console.log(id)

    handleClose()
    setRegistroSelecionado(undefined)
    const resultado = await excluirServico(id)
    console.log(resultado)
  }, [])

  return (
    <Box>
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
                <TableCell
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                  onClick={() => handleOpen(dado)}
                >
                  <DeleteForeverIcon color={'primary'}></DeleteForeverIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deseja excluir o registro
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography> Nome: {registroSelecionado?.nome}</Typography>
            <Typography> Valor: {registroSelecionado?.valor}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Não
          </Button>
          <Button
            onClick={() =>
              onExcluirServico(registroSelecionado ? registroSelecionado.id : 0)
            }
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
