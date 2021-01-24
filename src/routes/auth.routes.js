import { Router } from 'express';

import * as authController from './../controllers/auth.controller';

import { verifySignUp } from './../middlewares';

const router = Router();

router.post('/signin', authController.signIn);
router.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authController.signUp,
);

export default router;
