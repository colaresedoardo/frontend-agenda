'use server'
import ApiServer from '@/app/fetch/ApiServer'
import { revalidateTag } from 'next/cache'

export default async function excluirServico(id: number) {
  const api = new ApiServer()
  const data = api.delete('servico/', id)
  console.log('dentro do servidor')
  console.log(data)
  revalidateTag('listaServico')
  return data
}
