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
  verificaSabado,
} from '../../utils'

export type Config = {
  horario_inicial?: string
  horario_final?: string
  intervalo_entre_horario?: number
  data_inicial?: string
  data_final?: string
  trabalho_sabado?: boolean
  trabalho_domingo?: boolean
  horario_inicial_almoco?: string
  horario_final_almoco?: string
  cor_primaria_tema?: string
  cor_secundaria_tema?: string
  horario_inicial_sabado?: string
  horario_final_sabado?: string
}
type Props = {
  configuracao: Config[]
}
type EventoType = {
  horario: string
}
export default function SelecionarHorario(props: Props) {
  const configuracao = props.configuracao[0]
  const evento = useContext(ContextoEvento)
  const diaSelecionado = evento?.evento.map((evento) => evento.data_inicio)[0]
  const trabalhaSabado = configuracao.trabalho_sabado
  const horaInical = extrairNumeroDaHora(configuracao.horario_inicial!)

  const seperandoHorarioFinal = separarHoraMinuto(configuracao.horario_final!)

  const horarioFinal =
    seperandoHorarioFinal != null
      ? seperandoHorarioFinal
      : {
          hora: 17,
          minuto: 0,
        }
  const horaFinal = extrairNumeroDaHora(
    trabalhaSabado && verificaSabado(diaSelecionado!)
      ? configuracao.horario_final_sabado!
      : configuracao.horario_final!,
  )
  const intervalo = configuracao.intervalo_entre_horario
    ? configuracao.intervalo_entre_horario
    : 60
  const [listaDeHoras, setListaDeHoras] = useState<string[]>([])
  const diaAtual = trazerDataFormatoAmericano(new Date())
  const pegandoHorarioAtual = separarHoraMinuto(
    converterHoraMinutoParaString(
      new Date().getHours(),
      new Date().getMinutes(),
    ) + ':00',
  )

  const horarioAtual = pegandoHorarioAtual
    ? pegandoHorarioAtual
    : { hora: 17, minuto: 0 }

  const diaSelecionadoFormatado = trazerDataFormatoAmericano(
    new Date(`${diaSelecionado}T00:00`),
  )
  const horarioEstaIndisponivel =
    horarioAtual?.hora >= horarioFinal?.hora &&
    horarioAtual?.minuto >= horarioFinal?.minuto

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

    for (let hora = horaInical; hora <= horaFinal; hora++) {
      for (let minuto = 0; minuto < 60; minuto += intervalo) {
        console.log(hora + ':' + minuto)
        horas.push(converterHoraMinutoParaString(hora, minuto))
      }
    }
    const horarioFiltrado = horas.filter(
      (hora) =>
        hora >= formatarHora(configuracao.horario_inicial!) &&
        hora <= formatarHora(configuracao.horario_final!),
    )
    let valoresFiltrados = horarioFiltrado.filter(
      (hora) =>
        hora < formatarHora(configuracao.horario_inicial_almoco!) ||
        hora > formatarHora(configuracao.horario_final_almoco!),
    )

    if (trabalhaSabado && verificaSabado(diaSelecionado!)) {
      valoresFiltrados = valoresFiltrados.filter(
        (hora) =>
          hora >= formatarHora(configuracao.horario_inicial_sabado!) &&
          hora <= formatarHora(configuracao.horario_final_sabado!),
      )
    }

    if (listaDeHoras.length == 0) {
      setListaDeHoras(valoresFiltrados)
    }
  }, [])

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
          {horarioEstaIndisponivel == false ||
          diaSelecionadoFormatado == diaAtual ? (
            <>
              {resultado.length == 0 && (
                <Typography>
                  Não há mais horário para hoje. Selecione outra data.
                </Typography>
              )}
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
              {resultado.length > 0 ? (
                <>
                  {resultado.map((hora) => (
                    <ListItemButton
                      onClick={() => {
                        salvarHoraNoContexto(hora)
                      }}
                      key={hora}
                      selected={
                        horaSelecionada ? horaSelecionada == hora : false
                      }
                    >
                      <Typography>{hora}</Typography>
                    </ListItemButton>
                  ))}
                </>
              ) : (
                <Typography>
                  Não há mais horário para hoje. Selecione outra data
                </Typography>
              )}
            </>
          )}
        </ListItem>
      </List>
    </Box>
  )
}
