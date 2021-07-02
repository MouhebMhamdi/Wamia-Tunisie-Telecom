
var express = require('express');
var router = express.Router();
const PartenaireController = require('../controllers/PartenaireController')

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


router.get('/:id/events', PartenaireController.getMyEvents )
router.get('/events/:id',PartenaireController.getMyEventById)
router.post('/event/add', upload.single('image') ,PartenaireController.AddEvent )
router.post('/profile/:id', PartenaireController.UpdateProfile )
router.post('/updateEvent/:id',PartenaireController.updateEvent)

module.exports = router;