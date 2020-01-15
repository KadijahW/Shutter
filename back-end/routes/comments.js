const express = require('express')
const router = express.Router()
const db = require('./db')


router.get('/:image_id', async (req, res) => {
    try {
        let commentOnImage = await db.any(`SELECT commentors_name, comment FROM comments WHERE image_id = '${req.params.image_id}' `)
        res.json({
            payload: commentOnImage,
            message:"got all comments"
        })
    }catch (err){
        console.log(err)
        res.json({
            error:err
        })
    }
})

router.get('/count/:image_id', async(req, res) => {
    try{
        let commentCount = parseInt(req.params.image_id)
       let getCount =(`SELECT COUNT(comment) FROM comments WHERE image_id = $1;`)
       let overall =  await db.any(getCount, commentCount)
       res.json({
        payload: overall,
        message: "got all comments"
       })
    }catch(err){
        res.json({
            error:err
        })
    }
})


router.post('/:image_id', async (req, res) => {
    try {
        await db.none(`INSERT INTO comments(comment, commentors_name, image_id) VALUES(${req.params.image_id}, ${req.params.comment}, ${req.body.commentors_name})`)
        res.json({ message: "comment added"})
    }catch(err) {
        res.json({error: err})
    }
})


module.exports = router;
