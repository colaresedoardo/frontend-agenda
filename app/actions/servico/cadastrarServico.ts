'use server'

import { revalidateTag } from 'next/cache'
import ApiClient from '@/app/fetch/ApiClient'
export default async function cadastrarServico(formData: FormData) {
  'use server'
  if (!formData.get('descricao_modelo_ia')) {
    return {
      sucesso: false,
      messagem: 'Campo vazio. Preencha o valor  e tente novamente',
    }
  }

  const form = { descricao: formData.get('descricao_modelo_ia') }
  const apiClient = new ApiClient()
  const resposta = await apiClient.post('servico/', form)

  if (resposta['mensagem'] == 'Sucesso') {
    revalidateTag('listaServico')
    return { sucesso: true, messagem: 'Inserido com sucesso' }
  } else {
    return { sucesso: false, messagem: 'resposta' }
  }
}
