
import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration)

app.get('/',async(req,res)=>{
    res.status(200).send({
        message:"Welcome TO queryX"
    })
})

app.post( '/', async(req,res)=>{


    const prompt = req.body.prompt; 
    if(!prompt){
      return res.status(400).send({error:'prompt is required'}) 
    }
    try {
        await openai.createCompletion({
            model:'text-davinci-003',
            prompt:`${prompt}`,
            temperature:0,
            max_tokens:2000,
            frequency_penalty:0.5,
            top_p: 1,
            presence_penalty:0,

        }).then((response)=>{            
            res.send({bot:response.data.choices[0].text})
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
});

app.listen(5000,()=>{
    console.log('connected to port http://localhost:5000');
})



