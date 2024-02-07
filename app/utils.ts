export const converterData = (dataString: string) => {
  const data = new Date(`${dataString}T00:00:00`)

  const dia = data.getDate().toString().padStart(2, '0')
  const mes = (data.getMonth() + 1).toString().padStart(2, '0')
  const ano = data.getFullYear()

  return `${dia}/${mes}/${ano}`
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
