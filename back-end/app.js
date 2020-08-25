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

const userRouter = require('./routes/users');
const imageRouter = require('./routes/images');
const hashtagRouter = require('./routes/hashtags');
const likesRouter = require('./routes/likes');
const commentRouter = require('./routes/comments')


var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/user', userRouter)
app.use('/images', imageRouter)
app.use('/hashtags', hashtagRouter)
app.use('/likes', likesRouter)
app.use('/comments', commentRouter)

app.post('/upload',upload.single("image"),(req,res,next) =>{
    console.log("file",req.file) 
    console.log("body",req.body)
    let imageURL = "http://localhost:3001" + req.file.path.replace('public','')
    res.json({
        message: "file uploaded",
        imageUrl: imageURL
    })
} )

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})


module.exports = app;
