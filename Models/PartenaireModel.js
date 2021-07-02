const mongoose = require('mongoose');
const PartenaireSchema = mongoose.Schema({
    nom : {
        type : String ,
        required : true
    },
    prenom : {
        type : String ,
        required : true
    },
    telephone : {
        type : String ,
        required : true
    },
    adresse : {
        type : String ,
        required : true
    },
    image : {
        type : String ,
        required : true
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