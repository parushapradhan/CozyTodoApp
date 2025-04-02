const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');

router.get('/', controller.getForm);
router.post('/submit', controller.submitForm);

module.exports = router;
