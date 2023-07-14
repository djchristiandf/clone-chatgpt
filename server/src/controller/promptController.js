const InputPrompt = require('../model/input-model')
const openai = require('../config/openai')

module.exports = {
  async sendText(request, response) {
    const openaiApi = openai.configuration()
    const inputModel = new InputPrompt(request.body)
    try {
      const result = await openaiApi.createCompletion(openai.textCompletion(inputModel))
      return response.status(200).json({
        success: true,
        data: result.data.choices[0].text
      })
    } catch (err) {
      return response.status(400).json({
        success: false,
        error: err.response ? err.response.data : "OpenAI error with apiKey"
      })
    }
  }
}