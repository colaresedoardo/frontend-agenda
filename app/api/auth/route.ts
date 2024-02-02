export async function GET(request: Request) {
  console.log('aqui')
  console.log(request)
  try {
    // Dados para a solicitação de obtenção do token
    process.env.API_URL
    const apiUrl = process.env.API_URL + 'token/'

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Adicione os parâmetros necessários para obter o token
        username: 'edoardo',
        password: 'Eduardo1995',
        // ... outros parâmetros
      }),
    })
    console.log('aqui')
    const token = await response.json()
    console.log(token)
    return Response.json({ messagem: 'sucesso' })
    // if (response.ok) {
    //   const data = await response.json();
    //   const accessToken: string = data.access_token;
    //   return res.status(200).json({ accessToken });
    // } else {
    //   console.error('Erro ao obter o token:', response.statusText);
    //   return res.status(response.status).end();
    // }
  } catch (error) {
    console.error('Erro na solicitação:', error)
    return Response.json({ messagem: 'error' })
  }
}
