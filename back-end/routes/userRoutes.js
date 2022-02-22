const express = require('express');
const { Login, Regisister } = require('../controllers/userControllers');
const router = express.Router();
router.route('/login').post(Login)
router.route('/register').post(Regisister)
module.exports = router;