'use client'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ContextoEvento } from './Contexto'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { config } from './SelecionarHorario'
import { trazerDataFormatoAmericanoTipoDate } from '@/app/utils'

type Props = {
  configuracao: config[]
}
export default function ListarData(props: Props) {
  const nomesDosDiasDaSemana = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ]

  const [dataAtual, setDataAtual] = useState(new Date())

  const configuracao = props.configuracao[0]
  const trabalhaSabado = configuracao.trabalho_sabado
    ? configuracao.trabalho_sabado
    : false
  const dataFinal = new Date(`${configuracao.data_final}T00:00`)
  const dataInicial = new Date(`${configuracao.data_inicial}T00:00`)
  const [limiteDataFinal, setLimiteDataFinal] = useState(false)
  const [limiteDataInicial, setLimiteDataInicial] = useState(false)
  const [sequenciaDias, setSequenciaDias] = useState<string[]>([])
  const evento = useContext(ContextoEvento)
  const converteDiaDoMes = (data: string) => {
    const dataBruta = new Date(`${data}T00:00:00`)
    const dataLimpa = dataBruta.getDate()
    const conjuntos: Set<number>[] = []
    for (let i = 0; i <= 9; i++) {
      conjuntos.push(new Set([i]))
    }
    if (dataLimpa in conjuntos) {
      return '0' + dataLimpa
    }
    return dataBruta.getDate()
  }

  const convertDiaDaSemana = (data: string) => {
    const dataBruta = new Date(`${data}T00:00:00`)
    return dataBruta.getDay()
  }
  const converterMes = (data: string) => {
    const dataBruta = new Date(`${data}T00:00:00`)
    const conjuntos: Set<number>[] = []
    const dataLimpa = dataBruta.getMonth() + 1
    for (let i = 0; i <= 9; i++) {
      conjuntos.push(new Set([i]))
    }
    if (dataLimpa in conjuntos) {
      return '0' + dataLimpa
    }
    return dataLimpa
  }
  useEffect(() => {
    setLimiteDataFinal(false)
    setLimiteDataInicial(false)
    const proximosDias = []

    for (let i = 0; i < 8; i++) {
      const copiaDataAtual = trazerDataFormatoAmericanoTipoDate(
        new Date(dataAtual),
      )
      copiaDataAtual.setDate(dataAtual.getDate() + i)
      if (copiaDataAtual <= dataInicial) {
        setLimiteDataInicial(true)
      }
      if (copiaDataAtual > dataFinal) {
        setLimiteDataFinal(true)
      }

      if (copiaDataAtual <= dataFinal && copiaDataAtual >= dataInicial) {
        // Adicionar apenas se não for sábado (6) ou domingo (0)
        if (trabalhaSabado && copiaDataAtual.getDay() !== 0) {
          proximosDias.push(copiaDataAtual.toISOString().split('T')[0])
        } else if (
          copiaDataAtual.getDay() !== 6 &&
          copiaDataAtual.getDay() !== 0
        ) {
          proximosDias.push(copiaDataAtual.toISOString().split('T')[0])
        }
      }
    }

    if (sequenciaDias.length == 0) {
      setSequenciaDias(proximosDias)
    }
  }, [dataAtual, limiteDataFinal, limiteDataInicial])
  function adicionarDias(data: Date, quatidade: number) {
    const dia = data.getDate()
    const mes = data.getMonth()
    const ano = data.getFullYear()
    console.log('dentro de adicionar')
    console.log(configuracao)
    return new Date(ano, mes, dia + quatidade)
  }
  const atualizarSequenciaParaFrente = () => {
    const dataAdicionada = adicionarDias(dataAtual, 7)
    console.log(dataAdicionada)
    setDataAtual(dataAdicionada)
    setSequenciaDias([])
  }
  const atualizarSequenciaParaAtras = () => {
    const dataSubtraida = adicionarDias(dataAtual, -7)
    setSequenciaDias([])
    setDataAtual(dataSubtraida)
  }
  const salvarDataNoContexto = (dia: string) => {
    if (evento) {
      const valorAnterior = evento?.evento.map((evento) => evento.servico)[0]
      const profissional = evento?.evento.map(
        (evento) => evento.profissional,
      )[0]
      const horario = evento?.evento.map((evento) => evento.hora)[0]
      evento?.setEvento([
        {
          servico: valorAnterior,
          data_inicio: dia,
          profissional: profissional,
          hora: horario,
        },
      ])
    }
  }
  const dataPreenchida = evento?.evento.map((evento) => evento.data_inicio)[0]
  console.log('hoje')
  console.log()
  console.log('horario inicial')
  console.log(dataInicial)
  return (
    <Box display={'flex'}>
      <Button
        disabled={limiteDataInicial}
        onClick={atualizarSequenciaParaAtras}
      >
        <ArrowLeftIcon></ArrowLeftIcon>
      </Button>
      <List>
        <ListItem
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {sequenciaDias.map((dia) => (
            <ListItemButton
              key={dia}
              onClick={() => {
                salvarDataNoContexto(dia)
              }}
              selected={dataPreenchida == dia}
            >
              <Box>
                <Typography>
                  {converteDiaDoMes(dia)}/{converterMes(dia)}
                </Typography>

                <Box>
                  <Typography>
                    {nomesDosDiasDaSemana[convertDiaDaSemana(dia)]}
                  </Typography>
                </Box>
              </Box>
            </ListItemButton>
          ))}
        </ListItem>
      </List>
      <Button disabled={limiteDataFinal} onClick={atualizarSequenciaParaFrente}>
        <ArrowRightIcon></ArrowRightIcon>
      </Button>
    </Box>
  )
}
