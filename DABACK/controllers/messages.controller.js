var MessageService = require('../services/messages.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getMessages = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100; 

    try{
    
        var messages = await MessageService.getMessages({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: messages, message: "Succesfully Messages Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createMessage = async function(req, res, next){

    // Req.Body contains the form submit values.

    var message = {
        emetteurID:req.body.emetteurID,
        destinataireID:req.body.destinataireID,
        utilisateurID:req.body.utilisateurID,
        gestionnaireID:req.body.gestionnaireID,
        contenu:req.body.contenu,
        date:req.body.date
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdMessage = await MessageService.createMessage(message)
        return res.status(201).json({status: 201, data: createdMessage, message: "Succesfully Created Message"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Message Creation was Unsuccesfull"})
    }
}

exports.updateMessage = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var message = {
        id,
        emetteurID:req.body.emetteurID? req.body.emetteurID : null,
        destinataireID:req.body.destinataireID? req.body.destinataireID : null,
        utilisateurID:req.body.utilisateurID? req.body.utilisateurID : null,
        gestionnaire:req.body.gestionnaire? req.body.gestionnaire : null,
        contenu:req.body.contenu? req.body.contenu : null,
        date:req.body.date? req.body.date :Date.now()
    }

    try{
        var updatedMessage = await MessageService.updateMessage(message)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Message"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeMessage = async function(req, res, next){

    var id = req.params.id;
    console.log(id)
    try{
        var deleted = await MessageService.deleteMessage(id)
        return res.status(204).json({status:204, message: "Succesfully Message Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}