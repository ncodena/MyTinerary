const express = require('express');
const router = express.Router();

const Itinerary = require('../../models/ItineraryModel');

//@route GET api/itineraries
//@description Get itineraries
//@access Public

router.get('/all',
    (req, res) => {
        Itinerary.find({})
            .then(itineraries => {
                res.send(itineraries)
            })
            .catch(err => console.log(err));
});

//@route GET api/itineraries
//@description Get itineraries by city Id
//@access Public

router.get('/:cityName',
	(req, res) => {
  		let cityRequested = req.params.cityName;
  		Itinerary.find({references: cityRequested })
			.then(itineraries => {
				res.send(itineraries)
			})
			.catch(err => console.log(err));
});

module.exports = router;