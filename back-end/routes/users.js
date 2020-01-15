var express = require('express');
var router = express.Router();
const db = require('./db')


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.json([{name: "Jaiden"}, {username: "BxRebel"}]);
// });


router.get('/:email', async (req, res) => {
try {
  let singleUser = await db.one(`SELECT * FROM users WHERE email = '${req.params.email}'`);
  res.json({
      status: "Success", 
      body: {
          user: singleUser
      }
  })
} catch(error) {
  res.json({
      message: "No user associated with this username"
  })
}
})

router.post('/post', async (req, res) => {
  try {
      let insertQuery =`INSERT into users(username, email) 
      VALUES($1, $2)`

      if(!req.body.username && !req.body.email){
          res.json({
              "message": "Information Missing"
          })
      }else {
          await db.none(insertQuery, [req.body.username, req.body.email]);

          res.json({
              user: req.body.username + " " + "& " + req.body.email,
              message: "posted"
          })
      }
  } catch(error) {
      console.log(error);
      res.json({
          message: error
      })
  }
})

router.get('/', async (req, res) => {
  try {
      let allUsers = await db.any("SELECT * FROM users");

      res.json({
          users: allUsers, 
          message: "Success"
      })
  }catch (error) {
      res.json ({
          messsage:"Error"
      })
      console.log(error)
  }
})

module.exports = router;
