import axios from 'axios';

//Function that makes and handles API requests to ChatGPT
export async function makeApiRequest(apiMessages){
    //Try - a POST request to the backend Express route '/api' which makes the API request to ChatGPT
    try{
        //Makes a POST request to the backend Express route '/api' which makes the API request to ChatGPT - sends a message to ChatGPT and stores the response
        const responseData = await axios.post('/api', apiMessages);
        //Saves the response from ChatGPT
        const responseFromChatGPT = responseData.data.choices[0].message.content;
        //Returns the response from ChatGPT
        return responseFromChatGPT;
    } catch (error) {
        //If the ChatGPT API rate limit is exceeded
        if(error.response && error.response.status === 429){
            //Display the error in the console
            console.error('Error in makeApiRequest.js, ChatGPT API rate limit exceeded. ', error);
            //Create a new message informing the user what to do - this is displayed on screen in the chat log
            const responseData = 'Please wait 1 minute before sending another message.';
            //Return the message
            return responseData;
        }else{
            //For all other errors - display the error in the console
            console.error('Error in makeApiRequest.js', error)
            //Create a new message informing the user what to do - this is displayed on screen in the chat log
            const responseData = 'Error occurred, please try again or refresh the page.';
            //Return the message
            return responseData;
        }
    }
}
