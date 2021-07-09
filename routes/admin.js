
var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/AdminController')
router.get('/categories', AdminController.getAllCategories )
router.get('/events', AdminController.getAllEvents )
router.get('/event/:id/active', AdminController.ActiveEvent )
router.get('/events/active', AdminController.getAllActiveEvents )
router.get('/events/nonactive', AdminController.getAllNonActiveEvents )
router.post('/categorie/add', AdminController.AddCategorie )
router.post('/categorie/update', AdminController.UpdateCategorie )
router.get('/categorie/:id/delete', AdminController.DeleteCategorie )
router.get('/event/active',AdminController.getAllActiveEventsByCategorie)

module.exports = router;