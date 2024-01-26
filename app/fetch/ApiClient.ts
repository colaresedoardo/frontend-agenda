import { cookies } from 'next/headers'

class ApiClient {
  private baseUrl: string = process.env.API_URL

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
  ): Promise<any> {
    const url = new URL(endpoint, this.baseUrl)

    if (queryParams) {
      Object.keys(queryParams).forEach((key) =>
        url.searchParams.append(key, queryParams[key]),
      )
    }
    const token = `Bearer  ${cookies().get('Authorization')?.value}`
    let response = null
    if (nomeParaRevalidarConsulta) {
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
          Authorization: token,
        },
      })
    }

    return this.handleResponse(response)
  }

  async post(endpoint: string, data: Record<string, any>): Promise<any> {
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
export default ApiClient
