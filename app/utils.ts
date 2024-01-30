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
