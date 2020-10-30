const Sauce = require('../models/Sauce'); // Import the model in the app
const User = require('../models/User');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save() // Save into db
        .then(() => res.status(201).json({ message: 'Your sauce is correctly saved !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // To verify if the _id is the same of the id in the url
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.updateOneSauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Your change has been taken into account !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]; //To pick the name of the image file
            fs.unlink(`images/${filename}`, () => { //Delete the image file
                Sauce.deleteOne({ _id: req.params.id }) //Delete the all thing in the db
                    .then(() => res.status(200).json({ message: 'Sauce deleted !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find() // Send back an array of all sauces saved
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.updateLike = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {

            //Pick each informations from the params
            let userIdVote = req.body.userId;
            let userChoice = req.body.like;

            if ((sauce.usersLiked.indexOf(userIdVote) === -1) && (sauce.usersDisliked.indexOf(userIdVote) === -1)) { //If the user doesn't already vote
                if (userChoice === 1) {
                    sauce.usersLiked.push(userIdVote); //Save in the liked array
                    sauce.likes++;
                } else if (userChoice === -1) {
                    sauce.usersDisliked.push(userIdVote); //Save in the disliked array
                    sauce.dislikes++;
                } 
            } else { // If the user already voted, check if she/he changes his vote
                if (sauce.usersLiked.indexOf(userIdVote) !== -1){
                    if (userChoice === 0){
                        let posLike = sauce.usersLiked.indexOf(userIdVote);
                        sauce.usersLiked.splice(posLike, 1); //Delete from de liked array
                        sauce.likes--;
                    }
                } else if (sauce.usersDisliked.indexOf(userIdVote) !== -1){
                    if (userChoice === 0){
                        let posDislike = sauce.usersDisliked.indexOf(userIdVote);
                        sauce.usersDisliked.splice(posDislike, 1); //Delete from de disliked array
                        sauce.dislikes--;
                    }
                }
            }
            console.log(sauce);

            sauce.save()
                .then(() => res.status(201).json({ message: 'Your sauce is correctly saved !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};