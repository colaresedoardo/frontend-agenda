import { Avatar, Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function SelecionarHorario() {
  const [horaInical, setHoraInicial] = useState(8)
  const [horaFinal, setHoraFinal] = useState(17)
  const [intervalo, setIntervalo] = useState(30)
  const [listaDeHoras, setListaDeHoras] = useState<string[]>([])
  useEffect(() => {
    const horas = []
    const conjuntos = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
    console.log(conjuntos.has(8))
    for (let hora = horaInical; hora <= horaFinal; hora++) {
      for (let minuto = 0; minuto < 60; minuto += intervalo) {
        if (conjuntos.has(hora) && minuto == 0) {
          horas.push(`0${hora}:${minuto}0`)
        } else if (conjuntos.has(hora)) {
          horas.push(`0${hora}:${minuto}`)
        } else if (minuto == 0) {
          horas.push(`${hora}:${minuto}0`)
        } else {
          horas.push(`${hora}:${minuto}`)
        }
      }
    }
    if (listaDeHoras.length == 0) {
      setListaDeHoras(horas)
    }
  })
  console.log(listaDeHoras)
  return (
    <Box>
      {listaDeHoras.map((hora) => (
        <Button key={hora}>{hora}</Button>
      ))}
    </Box>
  )
}
