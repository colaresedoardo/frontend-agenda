'use client'
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'

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
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]
  const [dataAtual, setDataAtual] = useState(new Date())
  const [primeiraDataSequencia, setPrimeiraDataSequencia] = useState('')
  const [ultimaDataSequencia, setUltimaDataSequencia] = useState('')
  const [sequenciaDias, setSequenciaDias] = useState([])

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
  const converterStringParaData = (data: string) => {
    return new Date(`${data}T00:00:00`)
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
    console.log('DATA ATUAL AQUI')
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
    setUltimaDataSequencia('')
    setPrimeiraDataSequencia('')
    setSequenciaDias([])
  }
  const atualizarSequenciaParaAtras = () => {
    const dataSubtraida = adicionarDias(dataAtual, -7)
    setUltimaDataSequencia('')
    setSequenciaDias([])
    setDataAtual(dataSubtraida)
  }

  return (
    <Box display={'flex'}>
      <Button onClick={atualizarSequenciaParaAtras}>{'<'}</Button>
      {sequenciaDias.map((dia) => (
        <Button key={dia}>
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
