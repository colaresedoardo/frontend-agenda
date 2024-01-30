import { NextRequest, NextResponse } from 'next/server'

const authRoutes = ['/about/*', '/servico/*']

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

    const path = request.nextUrl.pathname
    if (authRoutes.some((pattern) => matchesWildcard(path, pattern))) {
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

        const respostaJson = await resposta.json()
        const sucesso = JSON.parse(respostaJson['sucesso'])

        if (!sucesso) {
          console.log('não deu certo')
          return NextResponse.redirect(process.env.NEXTAUTH_URL + 'login')
        }
      } else {
        return NextResponse.redirect(process.env.NEXTAUTH_URL + 'login')
      }
    }
  } catch (err) {
    console.log('error no middleware')
    // cookies().delete('Authorization')
    console.log(process.env.NEXTAUTH_URL)
    return NextResponse.redirect(process.env.NEXTAUTH_URL + 'login')
  }
}
