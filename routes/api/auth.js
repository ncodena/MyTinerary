const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ObjectId = require('objectid');
const auth = require('../../middleware/authMiddleware');
const User = require('../../models/UserModel');
const Itinerary = require('../../models/ItineraryModel');

//@route POST api/auth
//@description Authenticate user
//@access Public

router.post('/login', (req, res) => {


    const { password, email  } = req.body;
    // JSON.parse(Object.keys(req.body)[0]);

    // console.log(JSON.parse(Object.keys(req.body)[0]))

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

//@route GET api/auth/favourites
//@description Fetch user's favourites
//@access Private

router.get('/favourites', auth, (req, res) => {
    const userFavs = req.query.q.split(",");
    const favourites = userFavs.map((id) => ObjectId(id));
    Itinerary.find({
        "_id" : {"$in": favourites}
    }).then(favourites => res.send(favourites))
});

// @route PUT api/auth/update
// @desc PUSHING AND REMOVING favourites
// @access Private

// router.put('/update', auth, (req, res) => {
//     User.findOne({"_id": req.user.id
//     }, (err, user) => {
//         if (err) return res.sendStatus(500)
//         if(!user)return res.sendStatus(403)
//     })

// });


module.exports = router;