const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');


const maxAge = 60 * 60;

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};


const signUp = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;


    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ msg: 'All fields are required' });
    }


    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }


    const newUser = await User.create({ firstname, lastname, username, email, password });

    res.status(201).json({
      status: 201,
      msg: 'created',
    });

  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};


const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }
    console.log('password in db:', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const token = createToken(user._id, user.role);

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: maxAge * 1000,
    });

    res.status(200).json({
      status: 200,
      data: user.username,
    });

  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

module.exports = { signUp, signIn };