import { cookies } from 'next/headers'

class ApiServer {
  private baseUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL!

  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`Falha ao consultar a API ${response.status}`)
    }

    return response.json()
  }

  async get(
    endpoint: string,
    nomeParaRevalidarConsulta?: string,
    queryParams?: Record<string, string>,
  ): Promise<[]> {
    const url = new URL(endpoint, this.baseUrl)

    if (queryParams) {
      Object.keys(queryParams).forEach((key) =>
        url.searchParams.append(key, queryParams[key]),
      )
    }
    const autorizacao = cookies().get('Authorization')?.value
    console.log('autorização')
    console.log(autorizacao)
    const token = `Bearer  ${autorizacao}`
    let response = null
    if (nomeParaRevalidarConsulta) {
      if (autorizacao) {
        response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },

          next: { tags: [nomeParaRevalidarConsulta] },
        })
      } else {
        response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },

          next: { tags: [nomeParaRevalidarConsulta] },
        })
      }
    } else {
      if (autorizacao) {
        response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
      } else {
        response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
    }

    return this.handleResponse(response)
  }

  async post(
    endpoint: string,
    data: Record<string, string | number | undefined | null>,
  ): Promise<Record<string, string | number | undefined | null>> {
    const url = new URL(endpoint, this.baseUrl)
    const token = `Bearer  ${cookies().get('Authorization')?.value}`
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    })

    return this.handleResponse(response)
  }
}
export default ApiServer
