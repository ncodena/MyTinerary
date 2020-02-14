const express = require('express');
const router = express.Router();
const City = require('../../models/CityModel');

//@route GET api/cities
//@description Get all Cities
//@access Public

router.get('/', (req, res) => {
    City.find({})
    .then(cities => {
         res.json(cities)
    })
    .catch(err => console.log(err))
});

//@route POST api/cities
//@description Post a citys
//@access Public

router.post('/', (req, res) => {
    const newCity = new City({
        name: req.body.name,
        country: req.body.country,
        img: req.body.img
    });
    newCity.save ((err, city) => {
        if (city) {
            res.send(city);
        }
        else {
            res.status(500).send(err)
        }
    })
});

//@route GET api/cities
//@description Get a city by name
//@access Public

router.get('/:name', (req, res) => {
    let cityName = req.params.name
    City.findOne({name: cityName})
    .then(city => {
        res.json(city)
    })
    .catch(err => console.log(err))
});

//@route DELETE api/cities
//@description Delete an specific city by id
//@access Public

router.delete('/:id', (req, res) => {
    City.findById(req.params.id)
        .then(city => {
            city.remove()
                .then(() => res.json({success: true}))
        })
        .catch(err => res.status(404).json({success: false}))
})

module.exports = router;