const User = require('../models/User');
const Request = require('../models/Request');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require("fs");
const path = require("path");

const get_user = async (req, res) => {

        const user_id = req.user.id;
        const user = await User.findById(user_id).select('-password').lean();
        const requests = await Request.find({ buyer: user_id }).populate('car');

        return res.status(200).json({ ...user, role: user.role, requests });
};

const delete_user = async (req, res) => {

        const user_id = req.user.id;
        const { password } = req.body;
        if (!password) {
                return res.status(400).json({ message: "Password is required" });
        }
        const user = await User.findById(user_id);

        const r = await bcrypt.compare(password, user.password);
        if (!r) {
                return res.status(400).json({ message: "Wrong password" });
        }
        if (user.profileImage) {
                const imagePath = path.join(__dirname, "../..", user.profileImage);


                if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                }
        }
        const deletedUser = await User.findByIdAndDelete(user_id);
        res.clearCookie('token');

        return res.status(200).json({ message: "User deleted successfully" });
};

const update_email = async (req, res) => {

        const { password, email } = req.body;
        if (!password || !email) {
                return res.status(400).json({ message: "Password and email are required" });
        }
        const user_id = req.user.id;
        const user = await User.findById(user_id);
        const r = await bcrypt.compare(password, user.password);
        if (!r) {
                return res.status(400).json({ message: "Wrong password" });
        }
        const email_exists = await User.findOne({ email: email });
        if (email_exists) {
                return res.status(400).json({ message: "Email already in use" });
        }
        user.email = email;
        await user.save();
        return res.status(200).json({ message: "Email updated successfully" });
};

const update_password = async (req, res) => {


        const { old_password, new_password, confirm_password } = req.body;

        if (!old_password || !new_password || !confirm_password) {
                return res.status(400).json({ message: "All fields are required" });
        }


        const user_id = req.user.id;

        const user = await User.findById(user_id);

        const r = await bcrypt.compare(old_password, user.password);
        if (!r) {
                return res.status(400).json({ message: "Wrong password" });
        }
        if (new_password !== confirm_password) {
                return res.status(400).json({ message: "Passwords do not match" });
        }
        if (new_password.length < 8) {
                return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        if (!new_password.match(/[A-Z]/)) {
                return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
        }
        if (!new_password.match(/[a-z]/)) {
                return res.status(400).json({ message: "Password must contain at least one lowercase letter" });
        }
        if (!new_password.match(/[0-9]/)) {
                return res.status(400).json({ message: "Password must contain at least one number" });
        }
        if (!new_password.match(/[@$!%*?&]/)) {
                return res.status(400).json({ message: "Password must contain at least one special character" });
        }
        user.password = new_password;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully" });
};

const update_user = async (req, res) => {

        const { firstname, lastname, phone } = req.body;
        if (!firstname || !lastname) {
                return res.status(400).json({ message: "Firstname and lastname are required" });
        }
        const user_id = req.user.id;
        const user = await User.findById(user_id);
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.phone = phone || user.phone;
        await user.save();
        return res.status(200).json({ firstname: user.firstname, lastname: user.lastname, username: user.username, email: user.email, phone: user.phone });

};
const update_profile_image = async (req, res) => {

        const user_id = req.user.id;

        const user = await User.findById(user_id);

        if (!req.file) {
                return res.status(400).json({ message: "No image uploaded" });
        }
        if (user.profileImage) {
                const imagePath = path.join(__dirname, "../..", user.profileImage);


                if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                }
        }

        user.profileImage = `/uploads/profile_photo/${req.file.filename}`;
        await user.save();

        return res.status(200).json({
                message: "Profile image updated successfully",
                image: user.profileImage
        });



};

const logout = (req, res) => {
        res.clearCookie("token", {
                httpOnly: true,
                sameSite: "strict",
                path: "/",
        });

        return res.status(200).json({ message: "Logged out successfully" });
};


module.exports = { get_user, delete_user, update_email, update_password, update_user, update_profile_image, logout };