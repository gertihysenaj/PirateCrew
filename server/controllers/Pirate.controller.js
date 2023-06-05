const express = require('express');
const app = express();
const Pirate = require('../models/Pirate.model');


module.exports.getAllPirates = (req, res) => {
  Pirate.find({}).sort({name:'asc'})
    .then(pirates => res.json(pirates))
    .catch(err => res.status(400).json(err));
};

module.exports.createPirate = (req, res) => {
    if (req.body.crewPosition === "Captain") {
        Pirate.findOne({crewPosition: "Captain"})
        .then(pirate => {
            if (pirate) {
                return res.status(400).json({ errors: { crewPosition: { message: "A captain already exists" } }});
            } else {
                Pirate.create(req.body)
                .then(newPirate => res.json(newPirate))
                .catch(err => res.status(400).json(err));
            }
        });
    } else {
        Pirate.create(req.body)
        .then(newPirate => res.json(newPirate))
        .catch(err => res.status(400).json(err));
    }
};

  


module.exports.getPirate = (req, res) => {
  Pirate.findById(req.params.id)
    .then(pirate => res.json(pirate))
    .catch(err => res.status(400).json(err));
};

module.exports.updatePirate = (req, res) => {
    Pirate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
      .then(updatedPirate => res.json(updatedPirate))
      .catch(err => res.status(400).json(err));
  };

module.exports.deletePirate = (req, res) => {
  Pirate.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(400).json(err));
};


// module.exports.register = (req, res) => {
//     const { firstName, lastName, email, password } = req.body;
    
//     res.json({ message: 'User registered successfully. Redirecting to the home page...' });
//   };

//   module.exports.login = (req, res) => {
//     const { email, password } = req.body;

//     res.json({ message: 'User logged in successfully. Redirecting to the home page...' });
//   };
