'use server'

import { cookies } from 'next/headers'
export default async function authUser(formData: FormData) {
  'use server'
  try {
    cookies().delete('Authorization')
    const apiUrl = process.env.API_URL + 'token/'
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.get('user'),
        password: formData.get('password'),
      }),
    })
    const token = await response.json()
    if (token['access'] && token['grupo']) {
      cookies().set('Authorization', token['access'])
      cookies().set('grupo', token['grupo'])
      cookies().set('username', token['username'])
      cookies().set('nome_completo', token['nome_completo'])
      return { sucesso: true, linkPagina: token['grupo'] }
    } else {
      return { sucesso: false, linkPagina: '/login' }
    }
  } catch {
    return { sucesso: false, linkPagina: '/login' }
  }

  // redirect(`${token['grupo']}/`)

  //Verificar como redirecionar para a página que não tinha acesso antes do login
}
