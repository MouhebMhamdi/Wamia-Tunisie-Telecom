const mongoose = require('mongoose');
const EventSchema = mongoose.Schema({
    nom : {
        type : String ,
       
    },
    image : {
        type : String ,
       
    },
    description : {
        type : String ,
       
    },
    categerie : {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'categories'
       
    },
    prix : {
        type : Number 
    },
    date : {
        type : Date
    },
    heure : {
        type : String
    },
    videoUrl: {
        type : String
    },
    partenaire :{
        type : mongoose.Schema.Types.ObjectId, 
        ref :'partenaires'
    },
    stat : {
        type : String ,
        default : 'non active'
    }   
  
  

})

module.exports = mongoose.model('evenements',EventSchema)