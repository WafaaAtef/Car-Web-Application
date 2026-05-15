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
router.post('/profile-image', auth, upload_profile.single("image"), user.update_profile_image);
router.get('/logout', (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.status(200).json({ msg: "Logged out" });
});
module.exports = router;