import { Router } from 'express';

import * as userController from '../controllers/user.controller';

import { authJwt, verifySignUp } from './../middlewares';

const router = Router();

router.post(
  '/',
  [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkRolesExisted],
  userController.createUser,
);

export default router;
