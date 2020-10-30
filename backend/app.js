const express = require('express'),
  bodyParser = require('body-parser'), // To extract the JSON object from the front-end
  mongoose = require('mongoose'), //To interact with MongoDB
  path = require('path');

// Import the router in the app
const sauceRoutes = require('./routes/sauce'),
  userRoutes = require('./routes/user');

const app = express(); //Create an app with Express

mongoose.connect('mongodb+srv://tolonina:3uVJBSG715MYhqZN@cluster.awjwa.mongodb.net/sauce?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* Rectify CORS problem */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); // To apply in all application

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;