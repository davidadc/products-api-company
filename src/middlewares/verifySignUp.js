import { ROLES } from '../models/Role';

import User from '../models/User';

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { email, username } = req.body;

  let user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ message: 'Username already exists.' });
  }

  user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'Email already exists.' });
  }
  next();
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (const role of req.body.roles) {
      if (!ROLES.includes(role)) {
        return res
          .status(400)
          .json({ message: `Role ${role} does not exists.` });
      }
    }
  }

  next();
};
