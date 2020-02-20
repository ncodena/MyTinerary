const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/UserModel');

//@route POST api/auth
//@description Authenticate user
//@access Public

router.post('/login', (req, res) => {

    const { password, email  } = req.body;

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



module.exports = router;