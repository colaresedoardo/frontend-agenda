import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import ThemeRegistry from '@/theme/ThemeRegistry'
import PersistentDrawerLeft from './components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agendamento',
  description: 'Agendamento de serviços',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <PersistentDrawerLeft>{children}</PersistentDrawerLeft>
          </AppRouterCacheProvider>
        </body>
      </ThemeRegistry>
    </html>
  )
}
