export const converterData = (dataString: string) => {
  const data = new Date(`${dataString}T00:00:00`)

  const dia = data.getDate().toString().padStart(2, '0')
  const mes = (data.getMonth() + 1).toString().padStart(2, '0')
  const ano = data.getFullYear()

  return `${dia}/${mes}/${ano}`
}
export function diaFormatado(data: Date): string {
  // Cria um novo objeto Date com base no objeto fornecido
  const dataObj = new Date(data)

  // Adiciona um dia à data
  dataObj.setDate(dataObj.getDate() + 1)

  // Obtém os componentes da data formatada
  const ano: number = dataObj.getFullYear()
  const mes: string = String(dataObj.getMonth() + 1).padStart(2, '0')
  const dia: string = String(dataObj.getDate()).padStart(2, '0')

  // Formata o resultado no formato desejado
  const resultadoFormatado: string = `${ano}-${mes}-${dia}`

  return resultadoFormatado
}
export const trazerDataFormatoAmericano = (data: Date) => {
  const ano = data.getFullYear()
  const mes = ('0' + (data.getMonth() + 1)).slice(-2) // Adiciona um zero à esquerda se necessário
  const dia = ('0' + data.getDate()).slice(-2) // Adiciona um zero à esquerda se necessário
  return `${ano}-${mes}-${dia}T00:00`
}
export const trazerDataFormatoAmericanoTipoDate = (data: Date) => {
  const ano = data.getFullYear()
  const mes = ('0' + (data.getMonth() + 1)).slice(-2) // Adiciona um zero à esquerda se necessário
  const dia = ('0' + data.getDate()).slice(-2) // Adiciona um zero à esquerda se necessário
  return new Date(`${ano}-${mes}-${dia}T00:00`)
}
export function formatarHora(horaCompleta: string) {
  // Obtém apenas os primeiros 5 caracteres (hh:mm)
  const horaFormatada = horaCompleta.substring(0, 5)
  return horaFormatada
}
export function extrairNumeroDaHora(horaBruta: string) {
  // Dividir a string usando ":" como separador
  const partes = horaBruta.split(':')

  // Obter a primeira parte (hora)
  const hora = partes[0]

  // Remover zeros à esquerda, se houver
  const horaSemZeros = parseInt(hora, 10).toString()

  return Number(horaSemZeros)
}

export function converterHoraMinutoParaString(horas: number, minutos: number) {
  // Garantir que as horas e minutos estejam dentro dos limites válidos
  horas = Math.max(0, Math.min(23, horas))
  minutos = Math.max(0, Math.min(59, minutos))

  // Adicionar zeros à esquerda se necessário
  const horasFormatadas = horas < 10 ? '0' + horas : horas
  const minutosFormatados = minutos < 10 ? '0' + minutos : minutos

  // Retornar a string formatada
  return horasFormatadas + ':' + minutosFormatados
}

export function separarHoraMinuto(valor: string) {
  const regexHoraMinuto = /^(\d{2}):(\d{2}):(\d{2})$/
  const match = valor.match(regexHoraMinuto)

  if (match) {
    const hora = parseInt(match[1], 10)
    const minuto = parseInt(match[2], 10)

    return { hora, minuto }
  } else {
    console.error(
      'Formato inválido. Use o formato HH:mm:ss, por exemplo, 08:00:00',
    )
    return null
  }
}

export function verificaSabado(date: string) {
  const data = new Date(`${date}T00:00`)

  console.log(data)
  // Obter o dia da semana (0 = domingo, 1 = segunda-feira, ..., 6 = sábado)
  const diaDaSemana = data.getDay()

  // Verificar se é sábado (diaDaSemana igual a 6)
  if (diaDaSemana === 6) {
    return true
  } else {
    false
  }
}

export function converterIniciaisMaiusculas(nome: string): string {
  // Divida o nome em palavras
  const palavras = nome.split(' ')

  // Capitalize a primeira letra de cada palavra
  const nomeCapitalizado = palavras.map(
    (palavra) =>
      palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase(),
  )

  // Junte as palavras de volta em um nome
  const nomeConvertido = nomeCapitalizado.join(' ')

  return nomeConvertido
}
