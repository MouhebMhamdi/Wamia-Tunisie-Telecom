const mongoose = require('mongoose');
const ClientSchema = mongoose.Schema({
    amount : {
        type : String ,
       
    },
    code : {
        type : String ,
       
    },
    nbrTicket:{
        type: String,
    },
    price :{
        type: String,
    },
    user: {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'users'
    },
    event: {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'evenements'
    }
  

})

module.exports = mongoose.model('payment',ClientSchema)