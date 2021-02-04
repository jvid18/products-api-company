import { Router } from 'express';
const router = Router();

import * as AuthCtrl from '../controllers/auth.controller';
import { verifySignUp } from '../middlewares';

router.post('/signin', [
	verifySignUp.checkDuplicateUsernameOrEmail,
	verifySignUp.checkRolesExisted,
], AuthCtrl.signIn);

router.post('/signup', AuthCtrl.signUp);

export default router;
