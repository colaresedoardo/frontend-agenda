'use client'
import { Box, Button, Grid, Step, StepLabel, Stepper } from '@mui/material'
import MostrarServicos from './ListarServicos'
import { FormEvent, useContext, useState } from 'react'
import ListarData from './SelecionarData'
import ResumoServico from './Resumo'
import SelecionarProfissional from './SelecionarProfessional'
import SelecionarHorario, { config } from './SelecionarHorario'
import { ContextoEvento, EventoModelo } from './Contexto'
import FormFinal from './FormFinal'
import enviarMensagem from '../actions/servico/enviarMensagem'
import SendIcon from '@mui/icons-material/Send'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
type Props = {
  servicos: []
  profissionais: []
  configuracao: config[]
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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(e.currentTarget.elements.namedItem('numero'))
    const numero = (
      e.currentTarget.elements.namedItem('numero') as HTMLInputElement
    ).value
    const nome: string = (
      e.currentTarget.elements.namedItem('nome') as HTMLInputElement
    ).value
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
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{ width: '100%' }}
      component={'form'}
      // action={enviarMensagem}

      onSubmit={onSubmit}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ overflow: 'auto' }}
      >
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
        <Grid item md={4} xs={12} sm={12} justifyContent={'center'}>
          <ResumoServico />
        </Grid>
        <Grid item md={8} xs={12} sm={12}>
          {activeStep == 0 && <MostrarServicos servicos={props.servicos} />}
          {activeStep == 1 && <ListarData></ListarData>}
          {activeStep == 2 && (
            <SelecionarProfissional
              profissionais={props.profissionais}
            ></SelecionarProfissional>
          )}
          {activeStep == 3 && (
            <SelecionarHorario
              configuracao={props.configuracao}
            ></SelecionarHorario>
          )}
          {activeStep == 4 && <FormFinal></FormFinal>}
        </Grid>
        <Grid item xs={12}>
          <Box
            display={'flex'}
            gap={1}
            textAlign={'center'}
            justifyContent={'center'}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowLeftIcon />}
              onClick={handleBack}
            >
              voltar
            </Button>
            {activeStep == 4 ? (
              <>
                <Button endIcon={<SendIcon />} variant="outlined" type="submit">
                  enviar
                </Button>
              </>
            ) : (
              <>
                {' '}
                <Button
                  variant="outlined"
                  endIcon={<ArrowRightIcon />}
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
