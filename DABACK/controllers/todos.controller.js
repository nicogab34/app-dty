// Accessing the Service that we just created

var TodoService = require('../services/todos.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getTodos = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100; 

    try{
    
        var todos = await TodoService.getTodos({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: todos, message: "Succesfully Todos Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createTodo = async function(req, res, next){

    // Req.Body contains the form submit values.

    console.log("t2");

    var todo = {
        date: req.body.date,
        intitule: req.body.intitule,
        montant: req.body.montant,
        devise: req.body.devise,
        commentaire: req.body.commentaire,
        emetteur: req.body.emetteur,
        emetteurID: req.body.emetteurID,
        gestionnaire: req.body.gestionnaire,
        etat: req.body.etat,
        commentairegestion: req.body.commentairegestion,
        updated_at: req.body.updated_at
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdTodo = await TodoService.createTodo(todo)
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created ToDo"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        console.log("crash");
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
}

exports.updateTodo = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var todo = {
        id,
        date: req.body.date ? req.body.date : null,
        intitule: req.body.intitule ? req.body.intitule : null,
        montant: req.body.montant ? req.body.montant : null,
        devise: req.body.devise ? req.body.devise : null,
        commentaire: req.body.commentaire ? req.body.commentaire : null,
        emetteur: req.body.emetteur ? req.body.emetteur : null,
        emetteurID: req.body.emetteurID ? req.body.emetteurID : null,
        gestionnaire: req.body.gestionnaire ? req.body.gestionnaire : null,
        etat: req.body.etat ? req.body.etat : null,
        commentairegestion: req.body.commentairegestion ? req.body.commentairegestion : null,
        updated_at: req.body.updated_at ? req.body.updated_at : Date.now
    }

    try{
        var updatedTodo = await TodoService.updateTodo(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTodo = async function(req, res, next){

    var id = req.params.id;
    console.log(id)
    try{
        var deleted = await TodoService.deleteTodo(id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}