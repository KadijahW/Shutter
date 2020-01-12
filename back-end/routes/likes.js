/* MODULE INITS */
const express = require('express');
const router = express.Router();
// Database 
const db = require('./db.js');

const allLikesSinglePicture = async (req, res) => {
  try {
    let imageId = parseInt(req.params.image_id)
    let getQuery = `
    SELECT DISTINCT (liker_name) FROM likes WHERE image_id = $1;`

    // `SELECT COUNT(DISTINCT (liker_name)) FROM likes WHERE image_id = $1;`
    let allLikes = await db.any(getQuery, imageId)
    res.json({
      payload: allLikes,
      message: `got all likes`
    })
  } catch (error) {
    res.json({
      message: `There was an error!`
    })
  }
}
const countLikesSinglePicture = async (req, res) => {
  try {
    let imageId = parseInt(req.params.image_id)
    let getQuery = `
    SELECT COUNT(DISTINCT (liker_name)) FROM likes WHERE image_id = $1;`
    let allLikes = await db.any(getQuery, imageId)
    res.json({
      payload: allLikes,
      message: `got all likes`
    })
  } catch (error) {
    res.json({
      message: `There was an error!`
    })
  }
}

const postLikes = async (req, res) => {
  try {
    let imageId = parseInt(req.body.image_id)
    let likerName = req.body.liker_name
    let insertQuery = `
    INSERT INTO likes (liker_name, image_id)
    VALUES($1, $2)
    `
    let addLike = await db.none(insertQuery, [likerName, imageId])
    res.json({
      payload: req.params,
      message: "Like added!"
    })
  } catch (error) {
    res.json({
      message: `There was an error!`
    })
  }
}

const deleteLike = async (req, res) => {
  console.log(req.body)
  try {
    let image_id = parseInt(req.params.image_id)
    let liker_name = req.params.liker_name

    let insertQuery = `
      DELETE FROM likes 
      WHERE image_id= $1 AND liker_name = $2`
    await db.none(insertQuery, [image_id, liker_name])
    console.log(req.body)
    res.json({
      status: "success",
      message: `Delete Success`,
      body: req.body
    });
  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({
      message: "Error. Something went wrong"
    })
  }
};

router.get("/images/:image_id", allLikesSinglePicture)  //- Get all likes for a single image
router.get("/images/count/:image_id", countLikesSinglePicture)
router.post("/images", postLikes) //- Post single like
router.delete("/images/:image_id/:liker_name", deleteLike) //- delete a like

module.exports = router;
