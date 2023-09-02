import axios from 'axios';

//Function that handles API requests to ChatGPT
export async function makeApiRequest(apiMessages){
    //Stores the result from the ChatGPT API
    let responseData;

    try{
        //Makes a POST request to the backend Express route which makes the API request to ChatGPT - sends a message to ChatGPT and stores the response
        responseData = await axios.post('/api', apiMessages);
    } catch (error) {
        //If the request fails - displays the error in the console
        console.error('The following error occurred: ', error)
    }


    //Returns the response from ChatGPT
    return responseData;
}
