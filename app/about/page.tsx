import { cookies } from 'next/headers'

export default function Home() {
  const cookieStore = cookies()
  console.log(cookieStore.get('Authorization')?.value)
  return <main>about token</main>
}
