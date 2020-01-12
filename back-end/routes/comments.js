const express = require('express')
const router = express.Router()
const db = require('./db')


router.get('/:image_id', async (req, res) => {
    try {
        let commentOnImage = await db.any(`SELECT commentors_name, comment FROM comments WHERE image_id = '${req.params.image_id}' `)
        res.json({
            data: commentOnImage
        })
    }catch (err){
        console.log(err)
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
