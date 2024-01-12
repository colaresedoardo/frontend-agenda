import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const authRoutes = ['/about/*']

function matchesWildcard(path: string, pattern: string): boolean {
  if (pattern.endsWith('/*')) {
    const basePattern = pattern.slice(0, -2)
    return path.startsWith(basePattern)
  }
  return path === pattern
}

export async function middleware(request: NextRequest) {
  try {
    const auth = request.cookies.get('Authorization')?.value
    const apiUrl = process.env.API_URL + 'token/verify/'

    let path = request.nextUrl.pathname
    if (
      authRoutes.some((pattern) =>
        matchesWildcard(request.nextUrl.pathname, pattern),
      )
    ) {
      console.log(auth)
      if (auth != undefined) {
        const resposta = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: auth,
          }),
        })
        console.log('dentro do auth')
        const respostaJson = await resposta.json()
        const sucesso = JSON.parse(respostaJson['sucesso'])
        console.log(sucesso)
        if (sucesso) {
          console.log('deu certo')
          // console.log('não pode acessar')
          path = path.slice(1)
          const url = process.env.NEXTAUTH_URL + path
          console.log(url)
          return NextResponse.redirect(url)
        }
      } else {
        return NextResponse.redirect(process.env.NEXTAUTH_URL + 'login')
      }
    }
  } catch (err) {
    console.log('error no middleware')
    // cookies().delete('Authorization')
    return NextResponse.redirect(process.env.NEXTAUTH_URL + 'login')
  }
}
