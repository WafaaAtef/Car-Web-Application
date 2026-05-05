const express = require('express');
const { auth } = require('../../middleWares/authMiddleware');
const user = require('../../controllers/users');
const { upload_profile } = require("../../middleWares/uploadMidd");

const router = express.Router();

router.get('/', auth, user.get_user);
router.delete('/', auth, user.delete_user);
router.patch('/', auth, user.update_user);
router.patch('/email', auth, user.update_email);
router.patch('/password', auth, user.update_password);
router.patch('/profile-image', auth, upload_profile.single("image"), user.update_profile_image);
router.get('/logout', auth, user.logout);

module.exports = router;