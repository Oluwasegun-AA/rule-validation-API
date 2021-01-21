import express from 'express';
import RuleValidatorController from '../controllers/RuleValidatorController';

import validatePayload from '../middlewares/ruleValidator';

const validator = express.Router();
const {
  validateRule
} = RuleValidatorController;

validator.post('/', validatePayload, validateRule);

export default validator;
