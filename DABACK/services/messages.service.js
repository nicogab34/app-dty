// Gettign the Newly created Mongoose Model we just created 
var Message = require('../models/messages')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getMessages = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var messages = await Message.paginate(query, options)
        
        // Return the messaged list that was retured by the mongoose promise
        return messages;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Messages')
    }
}

exports.createMessage = async function(message){
    
    // Creating a new Mongoose Object by using the new keyword
    var newMessage = new Message({
        emetteurID:message.emetteurID,
        destinataireID:message.destinataireID,
        utilisateurID:message.utilisateurID,
        gestionnaireID:message.gestionnaireID,
        contenu:message.contenu,
        date: message.date
    })

    try{

        // Saving the Message 
        var savedMessage = await newMessage.save()

        return savedMessage;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating Message")
    }
}

exports.deleteMessage = async function(id){
    console.log(id);
    
    // Delete the Message
    try{
        var deleted = await Message.remove({_id: id})
        if(deleted.n === 0){
            throw Error("Message Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}