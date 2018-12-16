'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart_controller');

// router.get('/', controller.get);
router.get('/', controller.index);
router.post('/', controller.post);
router.put('/:email', controller.put);
router.delete('/:email', controller.delete);
router.post('/:email/send', controller.send);

module.exports = router;
