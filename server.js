const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

//A package that loads environment variables stored in .env files
require('dotenv').config();

//express.json - a middleware that parses incoming requests (req) so that data passed in can be accessed in req.body (apiMessages passed in) 
app.use(express.json());

//Serve static files from the 'client/build' folder (build files)
app.use(express.static(path.join(__dirname, 'client/build')));

//Catch-all route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//Route handler for POST requests to "/api" 
app.post("/api", async (req, res) =>{
    //Stores the request body (all the chat messages passed in as a payload)
    const apiMessages = req.body;

    //Stores the ChatGPT API key
    const API_KEY = process.env.API_KEY;

    //Sets how ChatGPT will talk - ChatGPT APi has 3 roles for messages, "user" (message user sends), "assistant (response from ChatGPT"), and "system"
    const systemMessage = { 
        "role": "system", 
        "content": "You are a senior developer interviewing software engineers, ask a question, do not provide the answer, analyse the ansis it wer from the user, let the user know if they are correct or incorrect and provide detailed feedback, do not ask the same question more than once"
    }

    //Creates an object that is sent in the body of the API request - specifies GPT model, system message & the current array of messages (ChatGPT formatted)
    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
              systemMessage,  
              ...apiMessages
        ]
    }

    //Converts the apiRequestBody JS object to a JSON string for sending to the ChatGPT API
    const stringifyApiRequestBody = JSON.stringify(apiRequestBody);

    //Stores the ChatGPT API URL in a variable
    const URL = "https://api.openai.com/v1/chat/completions";

    //Makes a POST request to the ChatGPT API (sends a message to ChatGPT)
    const result = await axios.post(URL, stringifyApiRequestBody, {
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    //Stores the response given by ChatGPT
    const responseData = result.data;

    //Responds to the request with the ChatGPT response
    res.json(responseData)
})

//Listens on the environment variable port (Heroku) OR port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
