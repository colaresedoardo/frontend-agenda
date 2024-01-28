'use server'

import { EventoModelo } from '@/app/agenda/Contexto'
import ApiClient from '@/app/fetch/ApiClient'
import ApiWhatsapp from '@/app/fetch/apiWhatsapp'
import { converterData } from '@/app/utils'

export default async function enviarMensagem(formData: EventoModelo) {
  const apiClient = new ApiClient()
  const bodyRequest = {
    data_inicio: formData.data_inicio,
    data_fim: formData.data_inicio,
    horario: formData.hora,
    servico: formData.servico.id,
    profissional: formData.profissional.id!,
    nome: formData.nome,
    numero: formData.numero,
  }
  const resposta = await apiClient.post('evento/', bodyRequest)

  if (resposta['mensagem'] == 'Sucesso') {
    const sequenciaTemplate = {
      servico: formData.servico.nome,
      valor: formData.servico.valor,
      tempo: formData.servico.tempo_servico,
      data_inicio: converterData(formData.data_inicio),
      hora: formData.hora,
      profissional: formData.profissional?.nome,
    }
    const apiWhatsapp = new ApiWhatsapp('239619722559434', formData.numero)
    const response = await apiWhatsapp.enviarMensagem(sequenciaTemplate)
    const resultado = await response.json()
    console.log('whatsapp')
    console.log(resultado)
    if (resultado['error']['error_data']['details']) {
      const error = resultado['error']['error_data']['details']
      return {
        sucesso: true,
        messagem: 'Inserido com sucesso no agendamento',
        mensagemEnviadaWhatsapp: false,
        errorWhat: error,
      }
    }
    const mensagemEnvidada = resultado['messages'][0].message_status
    if (mensagemEnvidada == 'accepted') {
      return {
        sucesso: true,
        messagem: 'Inserido com sucesso no agendamento',
        mensagemEnviadaWhatsapp: true,
      }
    } else {
      return {
        sucesso: true,
        messagem: 'Inserido com sucesso no agendamento',
        mensagemEnviadaWhatsapp: false,
      }
    }
  }
}
