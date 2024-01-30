'use server'

import ApiServer from '@/app/fetch/ApiServer'

export default async function listarServico() {
  const api = new ApiServer()
  const data = api.get('servico/', 'listaServico')

  return data
}
