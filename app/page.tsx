import { Box, Typography } from '@mui/material'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Page() {
  const grupo = cookies().get('grupo')?.value
  console.log('inicial')
  console.log(grupo)
  grupo ? redirect(`/${grupo}`) : ''
  return (
    <Box>
      {' '}
      <Typography fontWeight={500}>
        Por favor, entre em contato com o fornecedor do serviço.
      </Typography>
    </Box>
  )
}
