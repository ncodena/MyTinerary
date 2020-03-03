const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ObjectId = require('objectid');
const auth = require('../../middleware/authMiddleware');
const User = require('../../models/UserModel');
const Itinerary = require('../../models/ItineraryModel');
const Comment = require('../../models/CommentModel');

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
                                userName:user.userName,
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

router.put('/update', auth, (req, res) => {
    User.findOne({"_id": req.user.id
    }, (err, user) => {
        if (err) return res.sendStatus(500)
        if(!user)return res.sendStatus(403).json({msg: 'Please, log in to manage your favourites'})
        if (user.favourites.indexOf(req.body.favourites) === -1) {
            updateFavourite(req.user.id, req.body.favourites, res, "$push")
        } else {
            updateFavourite(req.user.id, req.body.favourites, res, "$pull")
        }
    })
});

const updateFavourite = (userId, favId, res, action) => {
    User.findOneAndUpdate({
        "_id":userId
      },
      {
          [action]: {
              "favourites": favId
          }
      },
      {new: true},
      (function(err, user){
            if (err) return res.sendStatus(500)
            if(!user)  return res.sendStatus(403).json({msg: 'Please, log in to manage your favourites'})
            return res.send(user) 
      }))
};

// @route GET api/auth/user/:id
// @desc Get user data
// @access Public

router.get('/user/:id', 
   async (req, res) => {
    // console.log("inside the get route")
    let userRequested = req.params.id;
    // console.log(req.params.id)
    await getUserById(userRequested).then(user =>res.json(user)).catch(err => console.log(err));
});

const getUserById = async (id) => {
    return await User.findOne({_id: id})
}


//@route GET api/auth/:itinerary/comments
//@description Fetch itineraries comments
//@access Private

router.get("/:itinerary/comments", auth, (req, res) => {
    const {itinerary} = req.params
    console.log(req.params)
    if (!req.user.id) return res.status(401).send({"msg": "Please, log in to show the comments"})
    if (!itinerary) return res.status(403).send({"msg": "No Itinerary found"})
    
    Comment
    .find({itineraryId: itinerary})
    .then(async comments => {

       let modifiedComments =  [];

       for (el of comments) {
           let comment = await modifyComment(el)
            modifiedComments.push(comment)
    }
    console.log(modifiedComments)
    res.send(modifiedComments)
    })
    
})

const modifyComment = async (comment) => {
    const {author, body, itineraryId, date} = comment;
    let user = await getUserById(ObjectId(author))
    .then(user => { 
            return { 
            id: user._id,
            userName: user.userName,
            img:user.img,
            country: user.country,
        }
    })

    return {
        user,
        body,
        itineraryId,
        date
    }
};

// @route POST api/auth/:itinerary/comments
// @desc Post comments from user profile
// @access Private

router.post("/itinerary/comments", auth, (req, res) => {

    const newComment = new Comment({
        author: req.user.id,
        itineraryId: req.body.itineraryId,
        body: req.body.body,
        date: req.body.date,
    });

    newComment.save()
        .then(comment => res.send("comment created", comment))
});


module.exports = router;