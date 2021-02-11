import { Router } from 'express';
const router = Router();

import * as AuthCtrl from '../controllers/auth.controller';
import { verifySignUp } from '../middlewares';

router.post('/signin', AuthCtrl.signIn);

router.post('/signup', [
	verifySignUp.checkDuplicateUsernameOrEmail,
	verifySignUp.checkRolesExisted,
], AuthCtrl.signUp);

export default router;
