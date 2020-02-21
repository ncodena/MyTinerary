const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/UserModel');

//@route POST api/users
//@description Register a new user
//@access Public

router.post('/register', (req, res) => {
    const {
            firstName,
            lastName, 
            userName, 
            password,
            email,
            country

    } = JSON.parse(Object.keys(req.body)[0]);
// Simple validation
console.log(JSON.parse(Object.keys(req.body)[0]))

console.log(!userName ||!email ||!password)

if(!userName ||!email ||!password){
    return res.status(403).json({msg: 'Please enter all fields'});

}

// Check for existent user
console.log()
User.findOne({email})
    .then(user => {
        console.log(user)
        if(user) return res.status(400).json({msg: 'User already exists'});

        const newUser = new User({
            firstName,
            lastName, 
            userName, 
            password,
            email,
            country
        });

        // const newUser = Object.keys(newUser)

        // Create salt & hash

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
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
                        
                    });
            })
        })

    })

    
});



module.exports = router;