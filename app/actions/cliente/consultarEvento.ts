'use server'

import ApiServer from '@/app/fetch/ApiServer'

export default async function listarEvento(formData: FormData) {
  const api = new ApiServer()
  const grupo = String(formData.get('grupo'))
  const dataInicio = String(formData.get('data_inicio'))
  const data = api.get('evento/', 'listaEvento', {
    grupo__identificador: grupo,
    data_inicio: dataInicio,
  })

  return data
}
