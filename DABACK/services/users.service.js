// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/users')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getUsers = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 

    try {
        var users = await User.paginate(query, options);
        
        // Return the todod list that was retured by the mongoose promise
        return users;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Users')
    }
}

exports.updateUser = async function(user){
    var id = user.id

    try{
        //Find the old Todo Object by the Id
    
        var oldUser = await User.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Todo")
    }

    // If no old Todo Object exists return false
    if(!oldUser){
        return false;
    }

    console.log(oldUser)

    //Edit the Todo Object
    oldUser.email = user.email
    oldUser.name = user.name
    oldUser.profile = user.profile
    oldUser.gestionnaireID = user.gestionnaireID
    oldUser.hash = user.hash
    oldUser.salt = user.salt


    console.log(oldUser)

    try{
        var savedUser = await oldUser.save()
        return savedUser;
    }catch(e){
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function(id){
    console.log(id);
    
    // Delete the User
    try{
        var deleted = await User.remove({_id: id})
        if(deleted.n === 0){
            throw Error("User Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e.message)
    }
}