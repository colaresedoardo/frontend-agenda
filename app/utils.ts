export const converterData = (dataString: string) => {
  const data = new Date(`${dataString}T00:00:00`)

  const dia = data.getDate().toString().padStart(2, '0')
  const mes = (data.getMonth() + 1).toString().padStart(2, '0')
  const ano = data.getFullYear()

  return `${dia}/${mes}/${ano}`
}
