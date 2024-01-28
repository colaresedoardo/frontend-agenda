'use client'
import { Box, Button } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ContextoEvento } from './Contexto'

export default function ListarData() {
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

  const [sequenciaDias, setSequenciaDias] = useState([])
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
    const proximosDias = []
    console.log(dataAtual)
    for (let i = 0; i < 8; i++) {
      const copiaDataAtual = new Date(dataAtual)
      copiaDataAtual.setDate(dataAtual.getDate() + i)

      // Adicionar apenas se não for sábado (6) ou domingo (0)
      if (copiaDataAtual.getDay() !== 6 && copiaDataAtual.getDay() !== 0) {
        proximosDias.push(copiaDataAtual.toISOString().split('T')[0])
      }
    }
    console.log(proximosDias)
    if (sequenciaDias.length == 0) {
      setSequenciaDias(proximosDias)
    }
  }, [dataAtual])
  function adicionarDias(data: Date, quatidade: number) {
    const dia = data.getDate()
    const mes = data.getMonth()
    const ano = data.getFullYear()
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

  return (
    <Box display={'flex'}>
      <Button onClick={atualizarSequenciaParaAtras}>{'<'}</Button>
      {sequenciaDias.map((dia) => (
        <Button
          key={dia}
          onClick={() => {
            salvarDataNoContexto(dia)
          }}
        >
          <Box>
            <Box>
              {converteDiaDoMes(dia)}/{converterMes(dia)}
            </Box>
            <Box>{nomesDosDiasDaSemana[convertDiaDaSemana(dia)]}</Box>
          </Box>
        </Button>
      ))}
      <Button onClick={atualizarSequenciaParaFrente}>{'>'}</Button>
    </Box>
  )
}
