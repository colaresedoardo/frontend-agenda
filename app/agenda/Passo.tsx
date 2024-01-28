'use client'
import {
  Box,
  Button,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
} from '@mui/material'
import MostrarServicos from './ListarServicos'
import { FormEvent, useContext, useState } from 'react'
import ListarData from './SelecionarData'
import ResumoServico from './Resumo'
import SelecionarProfissional from './SelecionarProfessional'
import SelecionarHorario from './SelecionarHorario'
import { ContextoEvento, EventoModelo } from './Contexto'
import FormFinal from './FormFinal'
import enviarMensagem from '../actions/servico/enviarMensagem'

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
    'Contato',
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

  async function onSubmit(e) {
    e.preventDefault()
    console.log(e.target.numero.value)
    const numero = e.target.numero.value
    const nome: string = e.target.nome.value
    const servico = evento?.evento.map((event) => event.servico)[0]
    const inicio = evento?.evento.map((event) => event.data_inicio)[0]
    const hora = evento?.evento.map((event) => event.hora)[0]
    const profissional = evento?.evento.map((event) => event.profissional)[0]
    const objeto: EventoModelo = {
      nome: nome,
      numero: numero,
      servico: servico!,
      data_inicio: inicio,
      hora: hora,
      profissional: profissional,
    }

    // console.log(objeto)
    const enviar = await enviarMensagem(objeto)
    console.log(enviar)
    // const formData = new FormData(event.target)
    // console.log(formData)
    // const response = await fetch('/api/submit', {
    //   method: 'POST',
    //   body: formData,
    // })

    // Handle response if necessary
    // const data = await response.json()
    // ...
  }
  console.log('contexto')
  console.log(evento)
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{ width: '100%' }}
      component={'form'}
      // action={enviarMensagem}
      encType="multipart/form-data"
      onSubmit={onSubmit}
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
          {activeStep == 4 && <FormFinal></FormFinal>}
        </Grid>
      </Grid>

      <Box
        display={'flex'}
        gap={1}
        textAlign={'center'}
        justifyContent={'center'}
      >
        <Button onClick={handleBack}>voltar</Button>
        {activeStep == 4 ? (
          <>
            <Button type="submit">enviar</Button>
          </>
        ) : (
          <>
            {' '}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}