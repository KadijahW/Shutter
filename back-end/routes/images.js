const express = require('express');
const router = express.Router();
const db = require('./db.js');




/* MIDDLEWARE */
const allPhotos = async (req, res, next) => {
    try {
        const selectQuery = `SELECT * FROM images;`;
        let response = await db.any(selectQuery);
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
const count = async (req, res, next) => {
    try {
        const selectQuery = `SELECT id FROM images WHERE id = (SELECT MAX(id) FROM images);`
        let response = await db.any(selectQuery)
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
const singlePhoto = async (req, res, next) => {
    try {
        let image = req.params.image
        const selectQuery = `SELECT * FROM images WHERE id = $1;`;
        let response = await db.any(selectQuery, image);
        res.json({
            status: "success",
            message: "photos retrieved",
            payload: response
        });
    }
    catch (error) {
        message: `There was an error!`
    }
}
const allUserPhotos = async (req, res, next) => {
    try {
        let user = req.params.poster_name
        const selectQuery = `SELECT * FROM images WHERE poster_name = $1;`;

        let response = await db.any(selectQuery, user);
        res.json({
            status: "success",
            message: "single user photos retrieved",
            body: response
        });
    } catch (error) {
        message: `There was an error!`
    }
}

const postPhoto = async (req, res, next) => {
    try {
        let id = req.body.id
        let poster = req.body.poster_name;
        let url = req.body.image_url;
        let caption = req.body.caption;
        let alt = req.body.alt
        let insertQuery = `INSERT INTO images(poster_name, image_url, caption, alt) VALUES ($1, $2, $3, $4)`
        await db.none(insertQuery, [poster, url, caption, alt])
        res.json({
            status: "success",
            message: "single user photos posted"
        });
    }
    catch (error) {
        message: `There was an error!`
    }
}

const changeUserImg = async (req, res, next) => {
    try {
        let userImg = req.body.image_url;
        let username = req.body.username;
        let insertQuery = `UPDATE users SET profileImage = $1 WHERE username = $2;`;
        await db.none(insertQuery, [userImg, username])
        res.json({
            status: "success",
            message: "user Image updated"
        });
        
    } catch(error) {
        message: "There was an error!"
    }
}

const getProfilePic = async (req, res, next) => {
    
    try {
        let username = req.params.username;
        console.log(username)
        let insertQuery = `SELECT profileImage FROM users WHERE username = $1;`;
        const response = await db.any(insertQuery, username)
        res.json({
            status:"success",
            message: "got profile pic!",
            body: response
        });

    } catch(error) {
        console.log(error)
        message: "There was an error!"
    }
}


/* ROUTES */
router.get("/profileImage/:username", getProfilePic)
router.get("/count", count)
router.get("/:image", singlePhoto); //get single photo
router.get("/users/:poster_name", allUserPhotos); // get all user's photos
router.post("/upload", postPhoto); // adds a single photo to a user
router.get("/", allPhotos);
router.patch("/", changeUserImg);


module.exports = router;
