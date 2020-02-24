const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/authMiddleware')

const User = require('../../models/UserModel');

//@route POST api/auth
//@description Authenticate user
//@access Public

router.post('/login', (req, res) => {


    const { password, email  } = JSON.parse(Object.keys(req.body)[0]);

    console.log(JSON.parse(Object.keys(req.body)[0]))

// Simple validation

if(!email ||!password){
    return res.status(400).json({msg: 'Please enter all fields'});

}

// Check for existent user

User.findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({msg: 'User does not exist'});

        // Validate password

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});
                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    {expiresIn: 3600},
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user : {
                                id: user.id,
                                firstName:user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                country: user.country,
                                img: user.img,
                                hasAgreed: user.hasAgreed,
                            }
                        });
                    }
                )
            })

        

    })
});

// @route GET auth/user
// @desc Get user data
// @access Private

router.get('/user', auth, (req, res) => {
    console.log('from get user route')
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

// @route GET auth/getUser/:id
// @desc Get user data
// @access Public

// router.get('/getUser/:id', 
//    async (req, res) => {
//     // console.log("inside the get route")
//     let userRequested = req.params.id;
//     // console.log(req.params.id)
//     await getUserById(userRequested).then(user =>res.json(user)).catch(err => console.log(err));
// });

// const getUserById = async (id) => {
//     return await User.findOne({_id: id})
// }



module.exports = router;