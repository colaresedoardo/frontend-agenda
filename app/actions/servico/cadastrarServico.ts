'use server'

import ApiServer from '@/app/fetch/ApiServer'
import { revalidateTag } from 'next/cache'
type TipoBody = Record<string, string | number | undefined | null>
export default async function cadastrarServico(formData: FormData) {
  if (!formData.get('descricao_modelo_ia')) {
    return {
      sucesso: false,
      messagem: 'Campo vazio. Preencha o valor  e tente novamente',
    }
  }

  const form: TipoBody = {
    descricao: String(formData.get('descricao_modelo_ia')),
    grupo: String(formData.get('grupo')),
  }
  const apiClient = new ApiServer()
  const resposta = await apiClient.post('servico/', form)

  if (resposta['mensagem'] == 'Sucesso') {
    revalidateTag('listaServico')
    return { sucesso: true, messagem: 'Inserido com sucesso' }
  } else {
    return { sucesso: false, messagem: 'resposta' }
  }
}
