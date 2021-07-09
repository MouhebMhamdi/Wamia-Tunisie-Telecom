const User = require('../models/UserModel')
const Partenaire = require('../Models/PartenaireModel')
const Client = require('../Models/ClientModel')
const Admin = require('../Models/AdministrateurModel')
const Category = require('../Models/CategorieModel')
const Event = require('../Models/EventModel')
const Payment = require('../Models/PaymentModel')
exports.AddCategorie = async (req,res) => {
    
    const cat = new Category({
        nom : req.body.nom,
        description : req.body.description,
    });
    cat.save().then(categorie =>{
        return res.status(200).json(categorie)
    }).catch(err=> {
        return res.status(400).json(err)
    })
    // User.find({}).then(users=>{
    //     return res.status(200).json(users);
    // }).catch(err=>{
    //     return res.json(err);
    // })
}
exports.UpdateCategorie = async(req,res) => {
    
    const data = {
        nom : req.body.nom,
        description : req.body.description,
    };
    await Category.findByIdAndUpdate(req.body._id,data).then(categorie =>{
        return res.status(200).json(categorie)
    }).catch(err=> {
        return res.status(400).json(err)
    })
   
}
exports.DeleteCategorie = async (req,res) => {
    await Category.findByIdAndRemove(req.params.id).then(categorie =>{
        return res.status(200).json(categorie)
    }).catch(err=> {
        return res.status(400).json(err)
    })
   
}

exports.getAllCategories = async(req,res) => {
    
   
    await Category.find({}).then(users=>{
        return res.status(200).json(users);
    }).catch(err=>{
        return res.json(err);
    })
}


exports.getAllEvents = async(req,res) => {
    await Event.find({}).populate('categerie'). // only return the Persons name
    exec(function (err, events) {
        if (err) return  res.status(400).json(err);
        return res.status(200).json(events);
   
    });
   
}



exports.getAllActiveEvents = async(req,res) => {
    await Event.find({ stat : 'active'}).populate('categerie'). // only return the Persons name
    exec(function (err, events) {
        if (err) return  res.status(400).json(err);
        return res.status(200).json(events);
   
    });
   
}
exports.getAllActiveEventsByCategorie = async(req,res) => {
    await Event.find({ stat : 'active'}).populate('categerie'). // only return the Persons name
    exec(function (err, events) {
        if (err) return  res.status(400).json(err);
        return res.status(200).json(events);
   
    });
   
}

exports.ActiveEvent = async(req,res) => {
    await Event.findByIdAndUpdate( req.params.id,{stat : 'active'}). // only return the Persons name
    exec(function (err, events) {
        if (err) return  res.status(400).json(err);
        return res.status(200).json(events);
   
    });
   
}
exports.getAllNonActiveEvents =async (req,res) => {
    await Event.find({ stat : 'non active'}).populate('categerie'). // only return the Persons name
    exec(function (err, events) {
        if (err) return  res.status(400).json(err);
        return res.status(200).json(events);
   
    });
   
}


