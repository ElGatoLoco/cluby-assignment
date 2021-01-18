import { ValidationSchema, Validator } from 'react-form-fp';

import { Field } from '../../shared/types/Field';

type CreateValidator = (field: Field) => Record<string, Validator>;
export const createValidator: CreateValidator = (field) => ({
  [field.id]: (val: string) => (new RegExp(field.validationRegex).test(val) ? null : `${field.title} is not valid`),
});

type ToFormModel = (acc: Record<string, ''>, curr: Field) => Record<string, ''>;
export const toFormModel: ToFormModel = (acc, curr) => ({ ...acc, [curr.id]: '' });

type FormModel = { [formName: string]: Record<string, ''> };
type CreateFormModel = (formName: string, fields: Field[]) => FormModel;
export const createFormModel: CreateFormModel = (formName, fields) => ({
  [formName]: fields.reduce(toFormModel, {}),
});

type ToValidationSchema = (acc: Record<string, Validator>, curr: Field) => Record<string, Validator>;
export const toValidationSchema: ToValidationSchema = (acc, curr) => ({ ...acc, ...createValidator(curr) });

type CreateValidationSchema = (formName: string, fields: Field[]) => ValidationSchema;
export const createValidationSchema: CreateValidationSchema = (formName, fields) => ({
  [formName]: fields.reduce(toValidationSchema, {}),
});
