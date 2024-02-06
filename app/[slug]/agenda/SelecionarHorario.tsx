import { Box, List, ListItem, ListItemButton, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ContextoEvento } from './Contexto'

import useSWR from 'swr'
import { fetcher } from '../../fetch/ApiClient'
import { trazerDataFormatoAmericano } from '../../utils'

export type config = {
  horaInicial?: string
  horaFinal?: string
  intervalo_entre_horario?: number
  data_inicial?: string
  data_final?: string
  trabalho_sabado: boolean
  trabalho_domingo: boolean
}
type Props = {
  configuracao: config[]
}
type EventoType = {
  horario: string
}
export default function SelecionarHorario(props: Props) {
  // const configuracao = props.configuracao[0]
  const [horaInical] = useState(8)
  const [horaFinal] = useState(20)
  const [intervalo] = useState(60)
  const [listaDeHoras, setListaDeHoras] = useState<string[]>([])
  const evento = useContext(ContextoEvento)

  const salvarHoraNoContexto = (hora: string) => {
    console.log(hora)
    const servicoAnterior = evento?.evento.map((evento) => evento.servico)[0]
    const dataAnterior = evento?.evento.map((evento) => evento.data_inicio)[0]
    const profissional = evento?.evento.map((evento) => evento.profissional)[0]
    const nome = evento?.evento.map((evento) => evento.nome)[0]
    const numero = evento?.evento.map((evento) => evento.numero)[0]
    evento?.setEvento([
      {
        hora: hora,
        servico: servicoAnterior!,
        data_inicio: dataAnterior,
        profissional: profissional!,
        nome: nome!,
        numero: numero!,
      },
    ])
  }
  const diaSelecionado = evento?.evento.map((evento) => evento.data_inicio)[0]
  const profissional = evento?.evento.map(
    (evento) => evento.profissional?.id,
  )[0]
  const parametros = {
    data_inicio: diaSelecionado ? diaSelecionado : '',
    profissional: profissional ? profissional : '',
  }
  const { data } = useSWR('evento/', (url) => fetcher(url, parametros))
  const resultado = listaDeHoras.filter(
    (hora) =>
      !data?.some((obj: EventoType) => obj.horario.substring(0, 5) == hora),
  )
  const horaSelecionada = evento?.evento.map((evento) => evento.hora)[0]
  useEffect(() => {
    // setListaDeHoras([])
    const horas = []
    const conjuntos = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])

    const dataHoraLocal = new Date()
    const dataSelecionada = new Date(`${diaSelecionado}T00:00`)
    const dataSelecioandaFormatada = trazerDataFormatoAmericano(dataSelecionada)
    const horaLocal = dataHoraLocal.getHours()
    const dataFormatada = trazerDataFormatoAmericano(dataHoraLocal)
    for (let hora = horaInical; hora <= horaFinal; hora++) {
      for (let minuto = 0; minuto < 60; minuto += intervalo) {
        //Condição para verificar se já passou o horário do dia
        if (hora >= horaLocal && dataSelecioandaFormatada == dataFormatada) {
          if (conjuntos.has(hora) && minuto == 0) {
            horas.push(`0${hora}:${minuto}0`)
          } else if (conjuntos.has(hora)) {
            horas.push(`0${hora}:${minuto}`)
          } else if (minuto == 0) {
            horas.push(`${hora}:${minuto}0`)
          } else {
            horas.push(`${hora}:${minuto}`)
          }
        } else if (dataSelecioandaFormatada != dataFormatada) {
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
    }
    // Verifica se as horas estão preenchidas no evento e mostra as horas restantes

    console.log('resultado aqui')
    console.log(resultado)
    console.log('data aqui')
    console.log(data)
    console.log('dia selcionado ' + diaSelecionado)
    if (listaDeHoras.length == 0) {
      setListaDeHoras(horas)
    }
  })
  console.log('config')
  console.log(props.configuracao)
  return (
    <Box>
      <List>
        <ListItem
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {resultado.length > 0 ? (
            <>
              {resultado.map((hora) => (
                <ListItemButton
                  onClick={() => {
                    salvarHoraNoContexto(hora)
                  }}
                  key={hora}
                  selected={horaSelecionada ? horaSelecionada == hora : false}
                >
                  <Typography>{hora}</Typography>
                </ListItemButton>
              ))}
            </>
          ) : (
            <>
              <Typography>Loading</Typography>
            </>
          )}
        </ListItem>
      </List>
    </Box>
  )
}
