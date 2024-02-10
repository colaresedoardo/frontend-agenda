import { NextRequest, NextResponse } from 'next/server'

const authRoutes = ['servico/*']

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

    const pathBruta = request.nextUrl.pathname
    const valor = pathBruta.split('/')
    const path = valor[valor.length - 1]

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
    // throw new Error('Failed to Delete Invoice');
    return NextResponse.redirect(process.env.NEXTAUTH_URL + 'login')
  }
}
