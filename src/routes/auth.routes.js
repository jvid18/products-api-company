import { Router } from 'express';
const router = Router();

import * as AuthCtrl from '../controllers/auth.controller';

router.post('/signin', AuthCtrl.signIn);

router.post('/signup', AuthCtrl.signUp);

export default router;
