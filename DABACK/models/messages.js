var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var MessageSchema = new mongoose.Schema({
    emetteurID:String,
    destinataireID:String,
    utilisateurID:String,
    gestionnaireID:String,
    contenu:String,
    date:{ type: Number, default: Date.now() }
})

MessageSchema.plugin(mongoosePaginate)
const Message = mongoose.model('Message', MessageSchema)

module.exports = Message;