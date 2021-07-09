const User = require('../models/UserModel')
const Partenaire = require('../Models/PartenaireModel')
const Client = require('../Models/ClientModel')
const Admin = require('../Models/AdministrateurModel')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const Payment = require('../Models/PaymentModel')
const Event = require('../Models/EventModel')
const { __await } = require('tslib')

exports.getAll = async(req,res) => {
    await User.find({}).then(users=>{
        return res.status(200).json(users);
    }).catch(err=>{
        return res.json(err);
    })
}

exports.UpdateProfile = async(req,res) => {
   
    const data = {
        nom : req.body.nom,
        prenom: req.body.prenom,
        username : req.body.username,
        email: req.body.email,
        telephone: req.body.telephone,
    };
    const data1={
        username:req.body.username,
        email:req.body.email,
    }
    await Client.findOneAndUpdate({'user':req.params.id},data).populate('user').then(Client =>{
        if(Client){
            User.findByIdAndUpdate(req.params.id,data1).then(user=>{
                return res.status(290).json(user)
            })
        }
        return res.status(200).json(Client)
    }).catch(err=> {
        console.log(err)
        return res.status(400).json(err)
    })
   
}
exports.getPaymentsByIdUser =async (req,res) => {
    await Payment.find({'user':req.params.id,'event':req.params.event}).populate('user').populate('event').then(Payment=>{
        return res.status(200).json(Payment);
    }).catch(err=>{
        return res.json(err);
    })
}
exports.getPayments =async (req,res) => {
    await Payment.find({}).populate('user').populate('event').then(Payment=>{
        return res.status(200).json(Payment);
    }).catch(err=>{
        return res.json(err);
    })
}
exports.getClients =async (req,res) => {
    await Client.find({}).populate('user').then(clients=>{
        return res.status(200).json(clients);
    }).catch(err=>{
        return res.json(err);
    })
}

exports.ChangeActive = async(req,res) => {
    await User.findById(req.params.id).then(user=>{
        if ( user.active == 0 ){
            User.findByIdAndUpdate(user._id,{ 'active' : 1 }).then(user=>{
                return res.status(200).json({'message' : 'changed'});
            }).catch(err=>{
                return res.status(400).json(err);
            })
        }else{
           User.findByIdAndUpdate(user._id,{ 'active' : 0 }).then(user=>{
                return res.status(200).json({'message' : 'changed'});
            }).catch(err=>{
                return res.status(400).json(err);
            }) 
        }
    }).catch(err=>{
        return res.json(err);
    })
}

exports.getPartenaires =async(req,res) => {
    await Partenaire.find({}).populate('user').then(partenaires=>{
        return res.status(200).json(partenaires);
    }).catch(err=>{
        return res.json(err);
    })
}
exports.DeletePartenaire =async (req,res)=>{
    Partenaire.findOneAndRemove({'user': req.params.id}).then(data=>{
        return res.status(200).json(data);
    }).catch(err=>{
        return res.json(err);
    });
}
exports.DeleteUser = async (req,res) => {


    await User.findByIdAndRemove(req.params.id).then(data=>{   
        if (data.role == "Partenaire"){
             Partenaire.findOneAndRemove({'user': data._id}).then(data=>{
                return res.status(200).json(data);
            }).catch(err=>{
                return res.json(err);
            });
        }else if (data.role == "Client"){

             Client.findOneAndRemove({'user': data._id}).then(data=>{
                if(data){
                     Payment.findOneAndRemove({'user': data._id}).then(data=>{
                        
                    }).catch(err=>{
                        return res.json(err);
                    });
                     Event.findOneAndRemove({'user': data._id}).then(data=>{
                       
                    }).catch(err=>{
                        return res.json(err);
                    });
                }
                return res.status(200).json(data);
            }).catch(err=>{
                return res.json(err);
            });
             
        }else{
             Admin.findOneAndRemove({'user': data._id}).then(data=>{
                if(data){
                     Client.findOneAndRemove({'user': data._id}).then(data=>{
                        
                    }).catch(err=>{
                        return res.json(err);
                    });
                }
                return res.status(200).json(data);
            }).catch(err=>{
                return res.json(err);
            });
            
        } 
        return res.status(200).json(data);
    }).catch(err=>{
        return res.json(err);
    })
}
exports.DeleteEvent = async (req,res) => {
    await Event.findByIdAndRemove(req.params.id).then(data=>{   
        return res.status(200).json(data);
    }).catch(err=>{
        return res.json(err);
    })
}

exports.UpdateRole=async(req,res)=>{
   
            
          await  User.findByIdAndUpdate(req.params.id,{ 'role' : req.params.event }).then(user=>{
                if( req.params.event=="Partenaire"){

                    Client.findOneAndRemove({'user': user._id}).then(data=>{
                       
                   
                    const partenaire = new Partenaire({
                        nom : req.body.nom ,
                        prenom : req.body.prenom ,
                        user : req.body.user ,
                        adresse : req.body.adresse ,
                        telephone : req.body.telephone ,
                        image : req.body.image ,
                        categorie : req.body.categorie
                    });
                      partenaire.save((error,data) => {
                        
                    });
                }).catch(err=>{
                        
                });
                }else{
                    Partenaire.findOneAndRemove({'user': user._id}).then(data=>{
                        const client = new Client({
                            nom : '' ,
                            prenom : '' ,
                            user : user._id ,
                            adresse : '' ,
                            telephone : '' ,
                            image : '' ,
                        });
                            client.save((error,data) => {
                            
                        });
                    }).catch(err=>{
                        
                    });
                }
                return res.status(200).json(res);
            }).catch(err=>{
                return res.status(400).json(err);
            })
       
   
}

exports.payment = async(req,res) => {
    await Payment.findOne({
        event : req.params.idPayment            
    }).exec( (error,payment) => {
        if (payment ) return res.status(413).json({
            message : 'payment déja existe'
    })
    })
    const _payment =new Payment({
        amout:req.body.amount,
        code:req.body.code,
        nbrTicket:req.body.nbrTicket,
        price:req.body.price,
        user:req.params.id,
        event:req.params.idPayment

    });
    _payment.save().then(payment =>{
        return res.status(200).json(payment)
    }).catch(err=> {
        return res.status(400).json(err)
    })
}



exports.signup = async(req,res) => {
   
    await User.findOne({
        email : req.body.email            
    }).exec( (error,user) => {
        if (user ) return res.status(400).json({
            message : 'User already registred'
        })
      
        const _user = new User({
            username : req.body.username, 
            role : req.body.role,
            email : req.body.email,
            password :req.body.password 
            
        });
          _user.save((error,data) => {
            if(error){
                return res.status(400).json({
                    message : "Something went wrong"
                });

            }
            if(data){
                if(req.body.role == "Admin"){
                    const admin = new Admin({
                        nom : req.body.nom ,
                        prenom : req.body.prenom ,
                        telephone:req.body.tel,
                        adresse : req.body.adresse ,
                        image :req.body.image,
                        user : data._id ,
                        
                    });
                     admin.save((error,data) => {
                        if(data){
                            return res.status(201).json({
                                message : "Admin created successfully ...!"
                            })
                        }
                    })
                }
                // ADD  ROLE USER
                if(req.body.role == "Partenaire"){
                    const partenaire = new Partenaire({
                        nom : req.body.nom ,
                        prenom : req.body.prenom ,
                        user : data._id ,
                        adresse : req.body.adresse ,
                        telephone : req.body.telephone ,
                        image : req.body.image ,
                        categorie : req.body.categorie
                    });
                      partenaire.save((error,data) => {
                        if(data){
                            return res.status(201).json({
                                message : "User created successfully ...!"
                            })
                        }
                    })

                }else{
                    const client = new Client({
                        nom : req.body.nom ,
                        prenom : req.body.prenom ,
                        user : data._id ,
                        adresse : req.body.adresse ,
                        telephone:req.body.telephone,
                        image :req.body.image,
                       
                    });
                    client.save((error,data) => {
                        if(data){
                            return res.status(201).json({
                                message : "User created successfully ...!"
                            })
                        }
                    })
                }
                
                
            }
        })


    }) // add user 
}

exports.signinAdmin = async(req,res) => {
    await User.findOne({
        email : req.body.email            
    }).exec((error,user)=>{
        if(error) return res.status(400).json({ error })
        if(user){
            if(user.role!="Admin" ){
                return res.status(501).json({message : "Erreur login"}) 
            }
           
                user.authenticate(req.body.password).then( 
                    data => {
                        if(data){
                            const token = jwt.sign({ _id:user._id , role : user.role  },"secrets", { expiresIn : '1h'}) 
                            const { _id ,  username , email , role , active } = user;
                            res.status(200).json({
                                token,
                                user :{
                                    _id ,
                                    username ,
                                    email ,
                                    role ,
                                    active
                                
                                }
                            })
                        }else{
                            return res.status(400).json({message : "Invalid password "}) 
                        }
                    
                            
                })
                    
                
                    
        }
        else{
            return res.status(403).json({ message : 'Something went wrong' })
        }
    })
}




exports.signin = async(req,res) => {
    await User.findOne({
        email : req.body.email            
    }).exec((error,user)=>{
        if(error) return res.status(400).json({ error })
        if(user){
            if(user.active==0 && user.role=="Partenaire" ||  user.role=="Admin"){
                return res.status(501).json({message : "Compte non Active"})    
            }
           
                user.authenticate(req.body.password).then( 
                    data => {
                        if(data){
                            const token = jwt.sign({ _id:user._id , role : user.role  },"secrets", { expiresIn : '1h'}) 
                            const { _id ,  username , email , role , active } = user;
                            res.status(200).json({
                                token,
                                user :{
                                    _id ,
                                    username ,
                                    email ,
                                    role ,
                                    active
                                
                                }
                            })
                        }else{
                            return res.status(400).json({message : "Invalid password "}) 
                        }
                    
                            
                })
                    
                
                    
        }
        else{
            return res.status(403).json({ message : 'Something went wrong' })
        }
    })
}


exports.getPartenaireByUserId =async (req,res,nex) => {
    await  Partenaire.find({ user : req.params.id }).populate('user').then(partenaire => {
        return res.status(200).json(partenaire);
    }).catch(err=>{
        return res.status(400).json(err); 

    })

}

exports.getClientByUserId = async(req,res,nex) => {
    await Client.find({ user : req.params.id }).populate('user').then(client => {
        return res.status(200).json(client);
    }).catch(err=>{
        return res.status(400).json(err); 

    })

}

exports.searchEventByid = async (req,res) =>{
    await Event.findById(req.params.id).populate('categerie').populate('partenaire').then(user=>{
        return res.status(200).json(user);
    }).catch(err=>{
        return res.status(462).json(err);
    })
}

exports.searchEvent = async (req,res) =>{
   
    if ( req.params.search == " " ){
        await Event.find({"stat":"active"}).then(events => {
            return res.status(200).json(events);
        }).catch(err=>{
            return res.status(400).json(err); 
    
        })
    }else{
        await Event.find({ "nom": { $regex: '.*' + req.params.search + '.*'},"stat":"active"}).then(events => {
            return res.status(200).json(events);
        }).catch(err=>{
            return res.status(400).json(err); 
    
        })
    }
  
}