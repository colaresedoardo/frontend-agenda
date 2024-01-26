'use client'
import { Box, Button } from '@mui/material'

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
  const diasDoMes = () => {
    const dataAtual = new Date()
    const next14Days = []
    for (let i = 0; i < 8; i++) {
      const currentDateCopy = new Date(dataAtual)
      currentDateCopy.setDate(dataAtual.getDate() + i)

      // Adicionar apenas se não for sábado (6) ou domingo (0)
      if (currentDateCopy.getDay() !== 6 && currentDateCopy.getDay() !== 0) {
        next14Days.push(currentDateCopy.toISOString().split('T')[0])
      }
    }
    return next14Days
  }
  const converteDiaDoMes = (data: string) => {
    const dataBruta = new Date(`${data}T00:00:00`)
    return dataBruta.getDate()
  }
  const convertDiaDaSemana = (data: string) => {
    const dataBruta = new Date(`${data}T00:00:00`)
    return dataBruta.getDay()
  }
  console.log(diasDoMes())
  const diaAtual = diasDoMes()[0]
  const convertida = new Date(`${diaAtual}T00:00:00`)
  console.log(convertida)
  return (
    <Box>
      {diasDoMes().map((dia) => (
        <Button key={dia}>
          data {converteDiaDoMes(dia)} -{' '}
          {nomesDosDiasDaSemana[convertDiaDaSemana(dia)]}
        </Button>
      ))}
    </Box>
  )
}
