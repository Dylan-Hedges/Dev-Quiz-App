import axios from 'axios';

//Function that handles API requests to ChatGPT
export async function makeApiRequest(apiMessages){

    //Makes a POST request to the backend Express route which makes the API request to ChatGPT - sends a message to ChatGPT and stores the response
    const responseData = await axios.post('/api', apiMessages);

    //Returns the response from ChatGPT
    return responseData;
}