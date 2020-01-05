const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer')
const cors = require('cors')

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"./public/images")
    },
    filename: (req,file,cb) =>{
        let name = Date.now() + "-" + file.originalname
        cb(null,name)
    }

})
const upload = multer(
    {
        storage: storage
    })/////

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.post('/upload',upload.single("image"),(req,res,next) =>{
console.log("file",req.file) 
console.log("body",req.body)
let imageUrl = "http://localhost:3001/" + req.file.path.replace('public/','')
res.json({
    message: "file uploaded",
    imageUrl: imageUrl
})
} )

module.exports = app;