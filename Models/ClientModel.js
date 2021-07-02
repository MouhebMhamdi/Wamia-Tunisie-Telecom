const mongoose = require('mongoose');
const ClientSchema = mongoose.Schema({
    nom : {
        type : String ,
       
    },
    prenom : {
        type : String ,
       
    },
    telephone : {
        type : String ,
       
    },
    adresse : {
        type : String ,
       
    },
    image : {
        type : String ,
       
    },
    user: {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'users'
    },
  

})

module.exports = mongoose.model('clients',ClientSchema)