var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ToDoSchema = new mongoose.Schema({
    date: Date,
    intitule: String,
    montant: Number,
    devise: String,
    commentaire: String,
    emetteur: String,
    gestionnaire: String,
    etat: String,
    commentairegestion: String,
    updated_at: { type: Date, default: Date.now }
})

ToDoSchema.plugin(mongoosePaginate)
const ToDo = mongoose.model('Todo', ToDoSchema)

module.exports = ToDo;