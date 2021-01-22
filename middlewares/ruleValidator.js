import joi from '@hapi/joi';
import { isObject } from 'lodash';
import {
  responseHandler, status, statusCodes, joiValidateHelper
} from '../helpers';

joi.options({ convert: false });

const rules = {
  rule: joi.object({
    field: joi
      .string()
      .required()
      .messages({
        'string.base': 'field should be a string.',
        'string.empty': 'field "field" in rule should have a value.',
        'any.required': 'field "field" is missing from rule.',
      }),
    condition: joi
      .string()
      .valid('eq', 'neq', 'gt', 'gte', 'contains')
      .required()
      .messages({
        'string.base': 'condition should be a string.',
        'string.empty': 'field condition in rule have a value.',
        'any.required': 'field condition is missing from rule.',
      }),
    condition_value: joi.alternatives().try(
      joi
        .number()
        .positive()
        .required()
        .messages({
          'any.required': 'field condition_value is missing from rule.',
        })
        .strict(),
      joi
        .string()
        .required()
        .messages({
          'string.empty': 'field condition_value in rule should have a value.',
          'any.required': 'field condition_value is missing from rule.',
        }),
    ).required().messages({
      'object.base': 'field condition_value should be a number or a string.',
      'object.empty': 'field condition_value in rule should have a value',
      'any.required': 'field condition_value is missing from rule.',
    })
  })
    .required()
    .messages({
      'object.base': 'rule should be an object.',
      'object.required': 'rule is required.',
    }),
  data: joi.alternatives().try(
    joi.string(),
    joi.array(),
    joi.object({
      name: joi
        .string()
        .required()
        .messages({
          'string.base': 'name should be a string.',
          'string.empty': 'field name in data should have a value.',
          'any.required': 'field nanme is missing from data.',
        }),
      crew: joi
        .string()
        .required()
        .messages({
          'string.base': 'crew should be a string.',
          'any.required': 'field crew is missing from data.',
        }),
      age: joi
        .number()
        .positive()
        .required()
        .messages({
          'number.base': 'age should be a number.',
          'any.required': 'field age is missing from data.',
        })
        .strict(),
      position: joi
        .string()
        .required()
        .messages({
          'string.base': 'position should be a string.',
          'any.required': 'field age is missing from data.',
        }),
      missions: joi.alternatives().try(
        joi
          .number()
          .positive()
          .required()
          .messages({
            'number.base': 'missions should be a number.',
            'any.required': 'field missions is missing from data.',
          })
          .strict(),
        joi.object({
          count: joi
            .number()
            .positive()
            .required()
            .messages({
              'number.base': 'field count should be a number.',
              'any.required': 'field count is missing from missions.',
            })
            .strict(),
          successful: joi
            .number()
            .positive()
            .required()
            .messages({
              'number.base': 'field successful should be a number.',
              'any.required': 'field successful is missing from missions.',
            })
            .strict(),
          failed: joi
            .number()
            .positive()
            .required()
            .messages({
              'number.base': 'field failed should be a number.',
              'any.required': 'field failed is missing from missions.',
            })
            .strict(),
        }).required().messages({
          'object.base': 'missions should be a number or an object.',
          'object.empty': 'field missions in data should have a value.',
          'any.required': 'field missions is missing from data.',
        })
      )
    })
  )
    .required()
    .messages({ 'any.required': 'data is required.' })
};

const validatorRules = joi.object(rules);
const validatePayload = async (req, res, next) => {
  const { body, headers } = req;
  const contentType = headers['content-type'];
  const payloadKeys = Object.keys(body);
  const validKeys = ['rule', 'data'];
  if (contentType !== 'application/json' ||
    !isObject(body) || Array.isArray(body)
      || (payloadKeys.length >= 1 && !payloadKeys.every(key => validKeys.includes(key)))) {
    return responseHandler(
      res,
      {
        code: statusCodes.badRequest,
        status: status.error,
        message: 'Invalid JSON payload passed.',
      }
    );
  }
  return joiValidateHelper(req, res, next, validatorRules);
};

export default validatePayload;
