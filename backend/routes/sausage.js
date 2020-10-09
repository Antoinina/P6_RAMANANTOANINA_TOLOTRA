const express = require('express'),
      router = express.Router(); // Creation of router Express

const auth = require('../middleware/auth');
const sausageCtrl = require('../controllers/sausage');

/* Send informations from the front to the db */
router.post('/', auth, sausageCtrl.createSausage);

/* Pick juste one sausage */
router.get('/:id', auth, sausageCtrl.getOneSausage);

/* Update informations in a sausage (image or body informations) */
router.put('/:id', auth, sausageCtrl.updateOneSausage);

/* Delete sausage */
router.delete('/:id', auth, sausageCtrl.deleteOneSausage);

/* Send back all informations from the db to the front */
router.get('/', auth, sausageCtrl.getAllSausages);

module.exports = router;