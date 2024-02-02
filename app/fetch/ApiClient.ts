import { getCookie } from 'cookies-next'
export const fetcher = (
  recurso: string,
  parametros?: Record<string, string>,
) => {
  const api = `${process.env.NEXT_PUBLIC_BACKEND_URL}${recurso}`
  const url = new URL(api!)

  if (parametros) {
    Object.keys(parametros).forEach((chave) => {
      url.searchParams.append(chave, encodeURIComponent(parametros[chave]))
    })
  }

  const token = getCookie('Authorization')
  return fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}
