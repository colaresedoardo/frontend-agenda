import listarServico from '../../actions/servico/listarServico'

import { cookies } from 'next/headers'
import ContextoServico from './Contexto'

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const grupo = cookies().get('grupo')?.value
    ? cookies().get('grupo')?.value
    : ''
  const data = await listarServico(grupo!)

  console.log('grupo')
  console.log(grupo)

  return <ContextoServico slug={slug} data={data}></ContextoServico>
}
