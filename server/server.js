import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

//const configuration = new Configuration({
//  apiKey: process.env.OPENAI_API_KEY,
//});

//const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'HELLO!'
  })
})




app.post('/', async (req, res) => {

  const prompt = req.body.prompt;

  try {

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": `${prompt}` }],
    });

    res.status(200).send({
      bot: response.data.choices[0].message.content
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error && 'Something went wrong');
  }
})
app.listen(5000, () => console.log('AI server started on http://localhost:5000'))

//app.post('/', async (req, res) => {
//
//  const configuration = new Configuration({
//    apiKey: process.env.OPEN_API_KEY,
//  });
//  const openai = new OpenAIApi(configuration);
//
//  const history = [];
//
//  while (true) {
//    const user_input = req.body.prompt;
//
//    const messages = [];
//    for (const [input_text, completion_text] of history) {
//      messages.push({ role: "user", content: `${input_text}` });
//      messages.push({ role: "assistant", content: `${completion_text}` });
//    }
//
//    messages.push({ role: "user", content: `${user_input}` });
//
//    try {
//      const completion = await openai.createChatCompletion({
//        model: "gpt-3.5-turbo",
//        messages: messages,
//      });
//
//      const completion_text = completion.choices[0].message.content;
//
//      res.status(200).send({
//        bot: completion_text
//      });
//
//      history.push([user_input, completion_text]);
//
//
//    } catch (error) {
//      if (error.response) {
//        console.log(error.response.status);
//        console.log(error.response.data);
//      } else {
//        console.log(error.message);
//      }
//    }
//    if (error){
//      return
//    }
//  }
//});
