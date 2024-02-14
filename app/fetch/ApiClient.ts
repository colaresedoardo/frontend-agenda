// import { getCookie } from 'cookies-next'
export const fetcher = async (
  recurso: string,
  parametros?: Record<string, string | number | boolean>,
) => {
  const api = `${process.env.NEXT_PUBLIC_BACKEND_URL}${recurso}`
  const url = new URL(api!)

  if (parametros) {
    Object.keys(parametros).forEach((chave) => {
      url.searchParams.append(chave, encodeURIComponent(parametros[chave]))
    })
  }
  console.log(url)
  // const token = getCookie('Authorization')
  const resultado = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      // Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())

  return resultado
}
