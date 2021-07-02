const mongoose = require('mongoose');
const CategorieSchema = mongoose.Schema({
    nom : {
        type : String ,
       
    },
    description : {
        type : String ,
       
    },
  
  

})

module.exports = mongoose.model('categories',CategorieSchema)