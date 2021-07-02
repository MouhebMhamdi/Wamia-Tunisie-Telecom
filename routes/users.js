
var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController')
router.get('/getAll', UserController.getAll )
router.get('/clients', UserController.getClients )
router.get('/partenaires', UserController.getPartenaires )
router.get('/:id/active/change', UserController.ChangeActive )
router.get('/:id/delete', UserController.DeleteUser )
router.get('/:id/deleteEvent', UserController.DeleteEvent )
router.get('/client/:id', UserController.getClientByUserId )
router.get('/partenaire/:id', UserController.getPartenaireByUserId )
router.get('/events/:search', UserController.searchEvent )
router.post('/profile/:id', UserController.UpdateProfile )
router.post('/payment/:id/:idPayment', UserController.payment )
router.post('/UpdateRole/:id/:event',UserController.UpdateRole)
router.get('/searchEventByid/:id',UserController.searchEventByid)

module.exports = router;