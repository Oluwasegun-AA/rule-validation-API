import express from 'express';
import dotenv from 'dotenv';
import profile from './profileRoute';
import ruleValidator from './ruleValidatorRoute';

dotenv.config();
const router = express.Router();

router.use('/', profile);
router.use('/validate-rule', ruleValidator);

export default router;
