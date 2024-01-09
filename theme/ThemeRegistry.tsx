'use client'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'

import { CssBaseline } from '@mui/material'
import { Roboto } from 'next/font/google'
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const themeOptions: ThemeOptions = {
  typography: {
    fontSize: 12,
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    background: {
      default: '#ffff',
    },
    primary: {
      main: '#000000',
    },
  },
}
const theme = createTheme(themeOptions)
export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
