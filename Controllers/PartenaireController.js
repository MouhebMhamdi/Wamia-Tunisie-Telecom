const User = require('../models/UserModel')
const Partenaire = require('../Models/PartenaireModel')
const Client = require('../Models/ClientModel')
const Admin = require('../Models/AdministrateurModel')
const Category = require('../Models/CategorieModel')
const Event = require('../Models/EventModel')

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
    await Partenaire.findOneAndUpdate({'user':req.params.id},data).populate('user').then(Partenaire =>{
        if(Partenaire){
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

exports.updateEvent=async(req,res)=>{
    const event={
        nom:req.body.nom,
        description:req.body.description,
        categerie:req.body.categorie,
        partenaire:req.body.partenaire,
        prix:req.body.prix,
        image:req.file.filename,
        date:req.body.date,
        heure:req.body.heure,
        
    }
    await Event.findByIdAndUpdate(req.params.id,event).populate('categorie').then(Event =>{
        return res.status(200).json(Client)
    }).catch(err=> {
        console.log(err)
        return res.status(400).json(err)
    })
    
}
exports.getMyEvents = (req,res) => {
    Event.find({partenaire : req.params.id }).then(events=>{
        return res.status(200).json(events);
    }).catch(err=>{
        return res.json(err);
    })
}
exports.getMyEventById = async (req,res) => {
    await Event.findById(req.params.id).populate('categerie').then(events=>{
        return res.status(200).json(events);
    }).catch(err=>{
        return res.json(err);
    })
}
exports.AddEvent = (req,res,next) => {
console.log(req.files)
    const event = new Event({
        nom :  req.body.nom,
        image : req.file.filename,
        description :req.body.description,
        categerie : req.body.categorie,
        prix : req.body.prix ,
        date :  req.body.date,
        heure :  req.body.heure,
        partenaire : req.body.partenaire
    });


    event.save().then(event=>{
        return res.status(200).json(event);
    }).catch(err=>{
        return res.json(err);
    })
}