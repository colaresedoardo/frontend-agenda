'use server'
import { cookies } from 'next/headers'
export default async function authUser(formData: FormData) {
  'use server'
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
  cookies().set('Authorization', token['access'])
  //Verificar como redirecionar para a página que não tinha acesso antes do login
}
