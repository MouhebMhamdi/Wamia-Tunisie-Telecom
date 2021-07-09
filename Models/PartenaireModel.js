const mongoose = require('mongoose');
const PartenaireSchema = mongoose.Schema({
    nom : {
        type : String ,
        required : false
    },
    prenom : {
        type : String ,
        required : false
    },
    telephone : {
        type : String ,
        required : false
    },
    adresse : {
        type : String ,
        required : false
    },
    image : {
        type : String ,
        required : false
    },
    categorie : {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'categories'
       
    },
    user: {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'users'
    },
  

})

module.exports = mongoose.model('partenaires',PartenaireSchema)