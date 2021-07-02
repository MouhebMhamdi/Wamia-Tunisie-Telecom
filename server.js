const express = require("express");
const mongoose = require('mongoose')
const bodyparser = require("body-parser")
var path = require('path');
var cors = require('cors')
require('dotenv/config')
//1-Execute express
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const app = express();

app.use(bodyparser());
app.use(express.json({limit:'5mb'}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use('/uploadsFolder', express.static(path.join(__dirname, '/uploads')));
//CROS VALIDATION HTTP HTTPS

const partenaireRoute = require('./routes/partenaire') 
const authRoute = require('./routes/auth') 
const authAdmin = require('./routes/admin') 
const userRoute = require('./routes/users') 

//app.use('/', indexRouter);
app.use('/admin', authAdmin);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/partenaire', partenaireRoute);




//connection()
mongoose.connect('DB_CONNECTION=mongodb://localhost:27017/eyapfe', {useNewUrlParser: true , useUnifiedTopology: true },
()=>{ console.log("connected to db")})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
const port = 8000
app.listen(port, () => console.log(`server started on port${port}`))
module.exports = app;
