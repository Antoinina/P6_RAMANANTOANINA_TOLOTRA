const Sausage = require('../models/Sausage'); // Import the model in the app

exports.createSausage = (req, res, next) => {
    delete req.body._id;
    const sausage = new Sausage({
        ...req.body
    });
    sausage.save() // Save into db
        .then(() => res.status(201).json({ message: 'Your sausage is correctly saved !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSausage = (req, res, next) => {
    Sausage.findOne({ _id: req.params.id }) // To verify if the _id is the same of the id in the url
        .then(sausage => res.status(200).json(sausage))
        .catch(error => res.status(404).json({ error }));
};

exports.updateOneSausage = (req, res, next) => {
    Sausage.updateOne({ _id: req.body.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Your change has been taken into account !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteOneSausage = (req, res, next) => {
    Sausage.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sausage deleted !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSausages = (req, res, next) => {
    Sausage.find() // Send back an array of all sausages saved
        .then(sausages => res.status(200).json(sausages))
        .catch(error => res.status(400).json({ error }));
};