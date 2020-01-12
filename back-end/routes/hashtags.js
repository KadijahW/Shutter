const express = require('express');
const router = express.Router();
const db = require('./db.js');

/* HELPERS */
const log = console.log;




/* MIDDLEWARE */
const allHashtags = async (req, res, next) => {
    try {
        let image_id = parseInt(req.params.image_id)
        const selectQuery = `SELECT * FROM hashtags WHERE image_id = $1;`;
        let response = await db.any(selectQuery, image_id);
        res.json({
            status: "success",
            message: "photos retrieved",
            body: response
        });
    }
    catch (error) {
        message: `There was an error!`
    }
}
const singleHashtagAllPhotos = async (req, res, next) => {
    try {
        word = req.params.word
        const selectQuery = `SELECT image_id FROM hashtags WHERE hashtag = $1;`; //double check later
        let response = await db.any(selectQuery, word);
        res.json({
            status: "success",
            message: "all photos for single hashtag",
            body: response.hashtag
        });
    } catch (error) {
        message: `There was an error!`
    }
}
const addHashtag = async (req, res, next) => {
    try {
        let hashtag = `${req.body.hashtag}`;
        let id = parseInt(req.body.image_id);
        let insertQuery = `INSERT INTO hashtags (hashtag, image_id) 
        VALUES ($1, $2)`
        let response = await db.none(insertQuery, [hashtag, id])
        res.json({
            status: "success",
            message: "hashtag posted"
        });
    }
    catch (error) {
        message: `There was an error!`
    }
}

/* ROUTES */
router.get("/image/:image_id", allHashtags); // gets all hashtags
router.get("/?word=:word", singleHashtagAllPhotos); // get all  photos for one hashtag
router.post("/upload/", addHashtag);



module.exports = router;
