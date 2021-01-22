/* eslint-disable camelcase */
import { isObject } from 'lodash';
import {
  responseHandler, status, statusCodes
} from '../helpers';

const { success, badRequest } = statusCodes;
const { error } = status;

const response = (res, {
  verdict, field, fieldValue, condition, condition_value
}) => responseHandler(res, {
  code: verdict ? success : badRequest,
  message: `field ${field} ${verdict ? 'successfully validated' : 'failed validation'}.`,
  status: verdict ? status.success : error,
  data: {
    validation: {
      error: !verdict,
      field,
      field_value: fieldValue,
      condition,
      condition_value
    }
  }
});

const missingfieldResponse = (res, field) => responseHandler(res, {
  code: badRequest,
  message: `field ${field} is missing from data.`,
  status: error,
});

class Validator {
  static async validateRule(req, res) {
    const { rule: { condition, field, condition_value }, data } = req.body;
    let fieldValue = data;
    const evaluateConditions = {
      eq: (conditionValue, value) => value === conditionValue,
      neq: (conditionValue, value) => value !== conditionValue,
      gt: (conditionValue, value) => value > conditionValue,
      gte: (conditionValue, value) => value >= conditionValue,
      contains: (conditionValue, value) => value.includes(conditionValue)
    };

    const tree = field.split('.');
    if (tree.length >= 1 && isObject(data[tree[0]]) && !Array.isArray(data[tree[0]])) {
      if (JSON.stringify(data).indexOf(tree[tree.length - 1]) === -1) {
        return missingfieldResponse(res, field);
      }

      for (let i = 0; i <= (tree.length - 1); i += 1) {
        fieldValue = fieldValue[tree[i]];
      }

      const verdict = evaluateConditions[condition](condition_value, fieldValue);

      return response(res, {
        verdict, field, fieldValue, condition, condition_value
      });
    }
    if (!data[field]) {
      return missingfieldResponse(res, field);
    }
    fieldValue = fieldValue[field];
    const verdict = evaluateConditions[condition](condition_value, data);
    return response(res, {
      verdict, field, fieldValue, condition, condition_value
    });
  }
}

export default Validator;
