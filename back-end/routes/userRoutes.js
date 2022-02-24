const express = require('express');
const { Login, Regisister, allUsers } = require('../controllers/userControllers');
const {protect} = require('../middlewares/authMiddleware');
const router = express.Router();
router.route('/login').post(Login);
router.route('/register').post(Regisister);
router.route('/user').get(protect, allUsers)
module.exports = router;