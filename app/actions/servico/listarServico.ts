'use server'
import ApiClient from '@/app/fetch/ApiClient'

export default async function listarServico() {
  const apiClient = new ApiClient()
  const data = apiClient.get('servico/', 'listaServico')

  return data
}
