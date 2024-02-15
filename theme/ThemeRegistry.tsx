'use client'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'

import { CssBaseline } from '@mui/material'
import { Roboto } from 'next/font/google'
import { useParams } from 'next/navigation'
import { fetcher } from '@/app/fetch/ApiClient'
import useSWR from 'swr'
import { Config } from '@/app/[slug]/agenda/SelecionarHorario'
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const grupo = useParams()
  const parametros = {
    grupo__identificador: grupo['slug'] ? String(grupo['slug']) : '',
  }

  const { data } = useSWR('configuracao/', (url) => fetcher(url, parametros))
  const config: Config = data ? (data[0] as Config) : {}

  const pallete = {
    primary: {
      main: config?.cor_primaria_tema ? config.cor_primaria_tema : '#EF5350',
    },
    secondary: {
      main: config?.cor_secundaria_tema
        ? config.cor_secundaria_tema
        : '#EF9A9A',
    },
    info: {
      main: '#ffff',
    },
  }
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
        main: pallete.primary.main,
      },
      secondary: {
        main: pallete.secondary.main,
      },
      info: {
        main: pallete.info.main,
      },
    },
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            ':hover': {
              backgroundColor: theme.palette.secondary.main,
              color: '#ffff',
              '.MuiListItemIcon-root': {
                color: theme.palette.primary.main,
              },
            },
            '&.Mui-selected': {
              '&:hover': {
                backgroundColor: theme.palette.secondary.main,
              },
              backgroundColor: theme.palette.secondary.main,
              color: '#ffff',

              '.MuiListItemIcon-root': {
                color: theme.palette.secondary.main,
              },
            },
            borderRadius: theme.spacing(2),
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            zIndex: 1,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h5: {
            fontSize: '2rem',
          },
          body1: {
            fontSize: '1rem',
          },
        },
      },
    },
  }

  const theme = createTheme(themeOptions)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
