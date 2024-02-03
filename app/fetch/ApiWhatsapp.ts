class ApiWhatsapp {
  private baseUrl: string
  private token: string = `Bearer ${process.env.WHATSAPP_TOKEN}`
  private numeroCliente: string
  constructor(identificadorWhatsapp: string, numeroCliente: string) {
    const url = `https://graph.facebook.com/v18.0/${identificadorWhatsapp}/messages`
    this.baseUrl = url
    this.numeroCliente = `55${numeroCliente}`
  }
  public preencherTemplate(valores: object) {
    const componentes: object[] = []
    Object.entries(valores).forEach(([_, valor]) => {
      console.log(_)
      componentes.push({ type: 'text', text: valor })
    })

    const corpo = {
      messaging_product: 'whatsapp',

      to: this.numeroCliente,
      type: 'template',
      template: {
        name: 'teste_agendamento',
        language: {
          code: 'pt_BR',
        },
        components: [
          {
            type: 'body',
            parameters: componentes,
          },
        ],
      },
    }
    return corpo
  }
  public async enviarMensagem(valores: object) {
    const corpo = this.preencherTemplate(valores)

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token,
      },
      body: JSON.stringify(corpo),
    })

    return response
  }
}

export default ApiWhatsapp
