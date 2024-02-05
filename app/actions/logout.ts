'use server'
import { cookies } from 'next/headers'

export default async function logout() {
  try {
    cookies().delete('Authorization')
    cookies().delete('grupo')
    cookies().delete('username')
    cookies().delete('nome_completo')
    return true
  } catch {
    return false
  }

  //Verificar como redirecionar para a página que não tinha acesso antes do login
}
