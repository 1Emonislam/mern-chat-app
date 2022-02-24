const { chatGet, groupCreate, groupRename, acessChat, groupAddTo, groupRemoveTo } = require('../controllers/chatContorllers');
const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
router.route('/chat').post(protect, acessChat)
router.route('/chat').get(protect, chatGet)
router.route('/group/create').post(protect, groupCreate);
router.route('/group/rename').put(protect, groupRename);
router.route('/group/addTo').put(protect, groupAddTo);
router.route('/group/removeTo').put(protect, groupRemoveTo);
module.exports = router;