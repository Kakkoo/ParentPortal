const express = require("express");
const User = require("../../models/user");

const router = express.Router();

// @route POST /api/users
// @desc Register user
// @access Public

router.get('/getuser', (req, res) => res.send('Hello World from get user'));
/* router.get("/getuser", (req, res) => {
    console.log(req.body);
    
    User.findOne({email: req.body.email}).then((user) => {
        if(user){
            return res.status(200).json({ user: user });
        }
    })
})
 */

module.exports = router;
