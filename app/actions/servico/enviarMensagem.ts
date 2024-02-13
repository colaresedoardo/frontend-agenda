'use server'

import { EventoModelo } from '@/app/[slug]/agenda/Contexto'

import ApiServer from '@/app/fetch/ApiServer'
import ApiWhatsapp from '@/app/fetch/ApiWhatsapp'
import { converterData } from '@/app/utils'

type TipoBody = Record<string, string | number | undefined | null>
export default async function enviarMensagem(formDataRaw: FormData) {
  const servicoConvertido = formDataRaw.get('servico')?.toString()
  const profissionalConvertido = formDataRaw.get('profissional')?.toString()
  const formData: EventoModelo = {
    nome: formDataRaw.get('nome')?.toString(),
    data_fim: String(formDataRaw.get('data_fim')?.valueOf()),
    servico: JSON.parse(servicoConvertido ? servicoConvertido : ''),
    data_inicio: formDataRaw.get('data_inicio')?.toString(),
    numero: formDataRaw.get('numero')?.toString(),
    hora: formDataRaw.get('hora')?.toString(),
    profissional: JSON.parse(
      profissionalConvertido ? profissionalConvertido : '',
    ),
    grupo: formDataRaw.get('grupo')?.toString(),
  }
  const apiClient = new ApiServer()
  console.log('dados')

  // const objeto: EventoModelo = {}
  // formDataRaw.forEach((value, key) => {
  //   const valor = value
  //   objeto.push({ key, valor })
  // })

  const bodyRequest: TipoBody = {
    data_inicio: formData.data_inicio,
    data_fim: formData.data_inicio,
    horario: formData.hora,
    servico: formData.servico.id,
    profissional: formData.profissional ? formData.profissional.id : null,
    nome: formData.nome,
    numero: formData.numero,
    grupo: formData.grupo,
  }
  console.log(bodyRequest)
  const resposta = await apiClient.post('evento/', bodyRequest)
  return resposta
}
