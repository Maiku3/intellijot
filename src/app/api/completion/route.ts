import {OpenAIApi, Configuration} from 'openai-edge'
import {OpenAIStream, StreamingTextResponse} from 'ai'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

// /api/completion
export async function POST(req: Request) {
  // extract the note name from the request body
  const {prompt} = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
        {
            role:'system',
            content:'You are a helpful and smart AI in a note taking app that helps users complete their notes.',
        },
        {
            role: 'user',
            content: `I am writing notes in my note taking app. Help me complete my train of thought here: ##${prompt}##`
        }
    ],
    stream: true,
})
const stream = OpenAIStream(response)

return new StreamingTextResponse(stream);
}