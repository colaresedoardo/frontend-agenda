import { Box, List, ListItem, ListItemButton, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ContextoEvento } from './Contexto'

import useSWR from 'swr'
import { fetcher } from '../../fetch/ApiClient'
import {
  converterHoraMinutoParaString,
  extrairNumeroDaHora,
  formatarHora,
  separarHoraMinuto,
  trazerDataFormatoAmericano,
} from '../../utils'

export type config = {
  horario_inicial?: string
  horario_final?: string
  intervalo_entre_horario?: number
  data_inicial?: string
  data_final?: string
  trabalho_sabado?: boolean
  trabalho_domingo?: boolean
  horario_inicial_almoco?: string
  horario_final_almoco?: string
}
type Props = {
  configuracao: config[]
}
type EventoType = {
  horario: string
}
export default function SelecionarHorario(props: Props) {
  const configuracao = props.configuracao[0]
  const horaInical = extrairNumeroDaHora(configuracao.horario_inicial!)
  const horarioInicial = separarHoraMinuto(configuracao.horario_inicial!)
  const horaFinal = extrairNumeroDaHora(configuracao.horario_final!)
  const horarioInicialAlmoco = extrairNumeroDaHora(
    configuracao.horario_inicial_almoco!,
  )

  const horarioFinalAlmoco = extrairNumeroDaHora(
    configuracao.horario_final_almoco!,
  )
  const intervalo = configuracao.intervalo_entre_horario
    ? configuracao.intervalo_entre_horario
    : 60
  const [listaDeHoras, setListaDeHoras] = useState<string[]>([])
  const evento = useContext(ContextoEvento)
  const [horarioEstaIndisponivel, setHorarioEstaIndisponive] = useState(false)
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
    const horas = []
    const dataHoraLocal = new Date()
    const dataSelecionada = new Date(`${diaSelecionado}T00:00`)
    const dataSelecioandaFormatada = trazerDataFormatoAmericano(dataSelecionada)
    const horaLocal = dataHoraLocal.getHours()
    const dataFormatada = trazerDataFormatoAmericano(dataHoraLocal)
    console.log('hora')
    console.log(horaLocal)
    console.log('data selecioanda')
    console.log(dataSelecioandaFormatada)

    for (let hora = horaInical; hora <= horaFinal; hora++) {
      for (let minuto = 0; minuto < 60; minuto += intervalo) {
        //Condição para verificar se já passou o horário do dia
        if (hora >= horaLocal && dataSelecioandaFormatada == dataFormatada) {
          horas.push(converterHoraMinutoParaString(hora, minuto))
        } else if (dataSelecioandaFormatada != dataFormatada) {
          if (hora == horarioInicialAlmoco || hora == horarioFinalAlmoco) {
            console.log('horario')
            console.log(hora)
          }
          horas.push(converterHoraMinutoParaString(hora, minuto))
        } else {
          setHorarioEstaIndisponive(true)
        }
      }
    }
    // Verifica se as horas estão preenchidas no evento e mostra as horas restantes
    // horas.pop()
    // horas.push(formatarHora(configuracao.horario_final!))
    // horas.splice(0, 1)
    // horas.pop()
    // horas.unshift(formatarHora(configuracao.horario_inicial!))
    // horas.push(formatarHora(configuracao.horario_final!))
    if (listaDeHoras.length == 0 && horarioEstaIndisponivel == false) {
      setListaDeHoras(horas)
    } else {
      console.log('horario não disponível')
    }
  }, [listaDeHoras])
  console.log(horarioInicial)
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
          {horarioEstaIndisponivel == false ? (
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
              <Typography>
                Não há mais horário para hoje. Selecione outra data
              </Typography>
            </>
          )}
        </ListItem>
      </List>
    </Box>
  )
}
