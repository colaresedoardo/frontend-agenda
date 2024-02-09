'use server'

import ApiServer from '@/app/fetch/ApiServer'
import { revalidateTag } from 'next/cache'
type TipoBody = Record<string, string | number | undefined | null>
export default async function cadastrarServico(formData: FormData) {
  const form: TipoBody = {
    nome: String(formData.get('nome')),
    valor: String(formData.get('valor')),
    grupo: String(formData.get('grupo')),
    id: String(formData.get('id')),
  }
  console.log(form)
  const apiClient = new ApiServer()
  const resposta = await apiClient.post('servico/', form)

  if (resposta['mensagem'] == 'Sucesso') {
    revalidateTag('listaServico')
    return { sucesso: true, messagem: 'Inserido com sucesso' }
  } else {
    return { sucesso: false, messagem: 'resposta' }
  }
}
