const express = require('express');
const { auth } = require('../../middleWares/authMiddleware');
const user = require('../../controllers/users');


const router = express.Router();

router.get('/', auth, user.get_user);
router.delete('/', auth, user.delete_user);
router.patch('/', auth, user.update_user);
router.patch('/email', auth, user.update_email);
router.patch('/password', auth, user.update_password);

module.exports = router;