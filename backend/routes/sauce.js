const express = require('express'),
      router = express.Router(); // Creation of router Express

const auth = require('../middleware/auth'),
      sauceCtrl = require('../controllers/sauce'),
      multer = require('../middleware/multer-config');

/* Send informations from the front to the db */
router.post('/', auth, multer, sauceCtrl.createSauce);

/* Send the update of likes for a sauce */
router.post('/:id/like', auth, sauceCtrl.updateLike);

/* Pick juste one sauce */
router.get('/:id', auth, sauceCtrl.getOneSauce);

/* Update informations in a sauce (image or body informations) */
router.put('/:id', auth, multer, sauceCtrl.updateOneSauce);

/* Delete sauce */
router.delete('/:id', auth, sauceCtrl.deleteOneSauce);

/* Send back all informations from the db to the front */
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;