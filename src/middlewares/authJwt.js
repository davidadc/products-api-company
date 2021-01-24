import jwt from 'jsonwebtoken';
import config from '../config';

import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;

    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const roles = await Role.find({ _id: { $in: user.roles } });

  for (const role of roles) {
    if (role.name === 'moderator') {
      next();
      return;
    }
  }
  return res
    .status(403)
    .json({ message: 'You do not have permissions to perform this action.' });
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const roles = await Role.find({ _id: { $in: user.roles } });

  for (const role of roles) {
    if (role.name === 'admin') {
      next();
      return;
    }
  }
  return res
    .status(403)
    .json({ message: 'You do not have permissions to perform this action.' });
};
