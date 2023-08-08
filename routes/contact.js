const path = require('path');
const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');

router.get('/', contactController.getContactPage);
router.post('/', contactController.postContactPage);

module.exports = router;