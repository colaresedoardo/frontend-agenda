'use client'

import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import MailIcon from '@mui/icons-material/Mail'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { useState } from 'react'
import { Button } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import logout from '@/app/actions/logout'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function PersistentDrawerLeft({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  // const [nomeCompleto, setNomeCompleto] = useState('')
  const nomeCompleto = getCookie('nome_completo')
  const router = useRouter()
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const login = () => {
    router.push('/login')
  }

  const logoutButton = async () => {
    const resultado = await logout()
    if (resultado) {
      // setNomeCompleto('')
      router.push('/login')
    }
  }
  const valor = useParams()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Agendamento
            </Typography>
          </Toolbar>
          <Box>
            {nomeCompleto && (
              <Typography variant="h6" noWrap component="div">
                {nomeCompleto}
              </Typography>
            )}
          </Box>
          <Box>
            {nomeCompleto ? (
              <Button
                sx={{ marginRight: '3vh' }}
                endIcon={<LogoutIcon></LogoutIcon>}
                color="info"
                onClick={logoutButton}
              >
                Logout
              </Button>
            ) : (
              <Button
                sx={{ marginRight: '3vh' }}
                color="info"
                endIcon={<LoginIcon></LoginIcon>}
                onClick={login}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {valor.slug && (
            <Link
              href={'/' + valor.slug + '/servico'}
              style={{
                textDecoration: 'none',
                color: theme.palette.primary.dark,
              }}
            >
              <ListItem disablePadding onClick={handleDrawerClose}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>

                  <ListItemText primary="Serviço"></ListItemText>
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          <Link
            href={'/' + valor.slug + '/agenda'}
            style={{
              textDecoration: 'none',
              color: theme.palette.primary.dark,
            }}
          >
            <ListItem disablePadding onClick={handleDrawerClose}>
              <ListItemButton>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>

                <ListItemText primary="Agenda"></ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            href="mensagem"
            style={{
              textDecoration: 'none',
              color: theme.palette.primary.dark,
            }}
          ></Link>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  )
}
