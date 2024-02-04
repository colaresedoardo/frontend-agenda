'use server'

import ApiServer from '@/app/fetch/ApiServer'

export default async function listarServico(slug: string) {
  const api = new ApiServer()
  const data = api.get('servico/', 'listaServico', {
    grupo__identificador: slug,
  })

  return data
}
