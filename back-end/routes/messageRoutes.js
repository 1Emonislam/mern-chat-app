const express = require('express');
const { sendMessage, allMessage } = require('../controllers/messageControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
router.route('/message').post(protect, sendMessage)
router.route('/message/:chatId').get(protect, allMessage);
module.exports = router;