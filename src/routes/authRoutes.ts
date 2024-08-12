import { Router } from 'express';
import { check } from 'express-validator';
import * as authController from '../controllers/authController';

const router = Router();

router.post(
    '/signup',
    [
        check('name').notEmpty(),
        check('email').isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    authController.signup
);
router.post(
    '/signin',
    [
        check('email').isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    authController.signin
);
router.post('/signout', authController.signout);

export default router;
