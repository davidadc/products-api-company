import jwt from 'jsonwebtoken';

import config from '../config';

import User from '../models/User';
import Role from '../models/Role';

export const signUp = async (req, res) => {
  // res.json('Sign Up');
  const { username, email, password, roles } = req.body;

  try {
    const user = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      user.roles = foundRoles.map((role) => role._id);
    } else {
      const userRole = await Role.findOne({ name: 'user' });
      user.roles = [userRole._id];
    }

    const savedUser = await user.save();

    const token = jwt.sign({ id: savedUser._id }, config.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json(e.message);
  }
};

export const signIn = async (req, res) => {
  // res.json('Sign In');
  const user = await User.findOne({ email: req.body.email }).populate('roles');

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }

  const matchPassword = await User.comparePassword(
    req.body.password,
    user.password,
  );

  if (!matchPassword) {
    res.status(401).json({ token: null, message: 'Invalid Password' });
  }

  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(200).json({ token });
};
