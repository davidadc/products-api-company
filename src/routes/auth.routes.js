import { Router } from 'express';

import * as authController from './../controllers/auth.controller';

const router = Router();

router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);

export default router;
