const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({
    username : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true
    },
    hash_password : {
        type : String ,
        required : true
    },
    active : {
        type : Number ,
        default : 0,
        required : true
    },
    role : {
        type : String ,
        enum : ['Admin','Client','Partenaire'] ,
        required : true
    }
  

}, { timestamps : true })
UserSchema.virtual('password').set(function(password){
        this.hash_password = bcrypt.hashSync(password,10)
})

UserSchema.virtual("fullname").get(function(){
    return `${this.nom} ${this.prenom}`;
})

UserSchema.methods = {
    authenticate : function(password){
        return bcrypt.compare(password,this.hash_password)
    }
}

module.exports = mongoose.model('users',UserSchema)