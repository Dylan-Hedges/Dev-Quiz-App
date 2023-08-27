//Converts all messages passed in to a format required by ChatGPT 
export function convertMessageFormat(chatMessages){
    //Maps over array of chat messages passed in and creates a new array
    let apiMessages = chatMessages.map((messageObject) => {
        //Creates a role variable (needed by ChatGPT API) 
        let role = "";
        //Sets the 'role' variable to "assistant" or "user" - translates to the naming required by ChatGPT API
        if (messageObject.sender === "ChatGPT") {
        role = "assistant";
        } else {
        role = "user";
        }
        //For each element has a new object with a 'role' & 'content' (previously 'sender' & 'message')
        return { role: role, content: messageObject.message}
    });
    //Returns formatted array of apiMessages 
    return apiMessages;
}
