// Accessing the Service that we just created

var UserService = require('../services/users.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getUsers = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100; 

    try{
    
        var users = await UserService.getUsers({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: users, message: "Succesfully Users Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.updateUser = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var user = {
        id,
        email: req.body.email ? req.body.email : null,
        name: req.body.name ? req.body.name : null,
        profile: req.body.profile ? req.body.profile : null,
        gestionnaireID: req.body.gestionnaireID ? req.body.gestionnaireID : null,
        hash:req.body.hash ? req.body.hash : null,
        salt:req.body.salt ? req.body.salt : null
    }

    try{
        var updatedUser = await UserService.updateUser(user)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function(req, res, next){

    var id = req.params.id;
    console.log(id)
    try{
        var deleted = await UserService.deleteUser(id)
        return res.status(204).json({status:204, message: "Succesfully User Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}