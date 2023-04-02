import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors({origin: '*'}))
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'HELLO!'
  })
})

conversation = [{"role": "system", "content": "Hello there!"}]

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    conversation.append({"role": "user", "content": `${prompt}`})
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversation     //[{"role": "user", "content": `${prompt}`}]
    });

    conversation.append({"role": "assistant", "content": response.data.choices[0].message.content})

    res.status(200).send({
      bot: response.data.choices[0].message.content
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))