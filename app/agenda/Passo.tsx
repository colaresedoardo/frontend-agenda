'use client'
import {
  Box,
  Button,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from '@mui/material'
import MostrarServicos from './ListarServicos'
import { useContext, useState } from 'react'
import ListarData from './SelecionarData'
import ResumoServico from './Resumo'
import SelecionarProfissional from './SelecionarProfessional'
import SelecionarHorario from './SelecionarHorario'
import { ContextoEvento } from './Contexto'

type Props = {
  servicos: []
  profissionais: []
}
export default function PassoPassoAgendamento(props: Props) {
  const steps = [
    'Selecionar serviços',
    'selecionar a data',
    'Selecionar professional',
    'Selecionar horário',
  ]
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set<number>())
  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }
  const evento = useContext(ContextoEvento)
  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  console.log('contexto')
  console.log(evento)
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{ width: '100%' }}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        spacing={2}
        // sx={{
        //   display: 'flex',
        //   gap: 1,

        //   justifyContent: 'space-around',
        // }}
      >
        <Grid item md={4}>
          <ResumoServico />
        </Grid>
        <Grid item md={8}>
          {activeStep == 0 && <MostrarServicos servicos={props.servicos} />}
          {activeStep == 1 && <ListarData></ListarData>}
          {activeStep == 2 && (
            <SelecionarProfissional
              profissionais={props.profissionais}
            ></SelecionarProfissional>
          )}
          {activeStep == 3 && <SelecionarHorario></SelecionarHorario>}
        </Grid>
      </Grid>
      <Box
        display={'flex'}
        gap={1}
        textAlign={'center'}
        justifyContent={'center'}
      >
        <Button onClick={handleBack}>voltar</Button>
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
        </Button>
      </Box>
    </Box>
  )
}
