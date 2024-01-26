'use client'
import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from '@mui/material'
import MostrarServicos from './ListarServicos'
import { useState } from 'react'

type Props = {
  servicos: []
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

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <MostrarServicos servicos={props.servicos} />
      <Button onClick={handleNext}>
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </Box>
  )
}
