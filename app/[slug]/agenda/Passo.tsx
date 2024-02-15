'use client'
import {
  Alert,
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material'
import MostrarServicos from './ListarServicos'
import { FormEvent, useContext, useState } from 'react'
import ListarData from './SelecionarData'
import ResumoServico from './Resumo'
import SelecionarProfissional from './SelecionarProfessional'
import SelecionarHorario, { Config } from './SelecionarHorario'
import { ContextoEvento } from './Contexto'
import FormFinal from './FormFinal'
import enviarMensagem from '../../actions/servico/enviarMensagem'
import SendIcon from '@mui/icons-material/Send'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { converterData } from '@/app/utils'
type Props = {
  servicos: []
  profissionais: []
  configuracao: Config[]
  identificarCliente: string
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
  const [sucesso, setSucesso] = useState(false)
  const [fracasso, setFracasso] = useState(false)
  const [mensagem, setMensagem] = useState('')
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

    const formDataObject = new FormData()
    formDataObject.append('nome', nome)
    formDataObject.append('numero', numero)
    formDataObject.append('servico', JSON.stringify(servico))
    formDataObject.append('data_inicio', inicio ? inicio : '')
    formDataObject.append('hora', hora ? hora : '')
    formDataObject.append('profissional', JSON.stringify(profissional))
    formDataObject.append('grupo', props.identificarCliente)
    // console.log(objeto)
    const enviar = await enviarMensagem(formDataObject)
    let conteudo = `Olá, o serviço ${servico?.nome} 
foi confirmado 📖
*Resumo*:
serviço: ${servico?.nome} ✏️
valor: *${servico?.valor}* 💰
tempo estimado: ${servico?.tempo_servico} minutos ⏱️
dia: *${converterData(inicio!)}* 📅
horário: *${hora}* ⏱️
profissional: ${profissional?.nome} 👤`

    console.log('aqui')
    console.log(enviar)
    if (enviar['mensagem'] == 'Sucesso') {
      setMensagem('Envidado com sucesso')
      setSucesso(true)
    } else {
      setFracasso(true)
      setMensagem('Erro ao enviar mensagem')
    }
    setTimeout(() => {
      setSucesso(false)
      setFracasso(false)
    }, 4000)

    conteudo = encodeURIComponent(conteudo)
    const url = `https://api.whatsapp.com/send?phone=${profissional?.telefone}&text=${conteudo}`
    // window.open(url)
    window.location.replace(url)
  }

  const habilitarBotaoProximoServico = evento?.evento.map(
    (event) =>
      (event.servico.id == 0 && activeStep == 0) ||
      (event.data_inicio == undefined && activeStep == 1) ||
      (event.profissional == undefined && activeStep == 2) ||
      (event.hora == undefined && activeStep == 3),
  )[0]

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
      <Grid container spacing={2}>
        <Grid item md={4} xs={12} sm={12} justifyContent={'center'}>
          <ResumoServico />
        </Grid>
        <Grid item md={8} xs={12} sm={12}>
          {activeStep == 0 && <MostrarServicos servicos={props.servicos} />}
          {activeStep == 1 && (
            <ListarData configuracao={props.configuracao}></ListarData>
          )}
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
                  disabled={habilitarBotaoProximoServico}
                >
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </Button>
              </>
            )}
          </Box>
          <Box>
            {sucesso && <Alert severity="success">{mensagem}</Alert>}
            {fracasso && <Alert severity="error">{mensagem}. </Alert>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
