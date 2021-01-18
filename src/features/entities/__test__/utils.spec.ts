import { createFormModel, createValidationSchema, createValidator, toFormModel, toValidationSchema } from '../utils';

test('successfully creates validator', () => {
  const mockField = {
    id: 'licensePlate',
    title: 'License plate',
    validationRegex: '^([A-Z]){1,3}-([0-9]){1,3}$',
  };
  const validator = createValidator(mockField);

  expect(validator.licensePlate('ABC-123')).toEqual(null);
  expect(validator.licensePlate('123')).toEqual('License plate is not valid');
});

test('successfully creates empty model field', () => {
  const mockField = {
    id: 'licensePlate',
    title: 'License plate',
    validationRegex: '^([A-Z]){1,3}-([0-9]){1,3}$',
  };
  const fieldModel = toFormModel({}, mockField);

  expect(fieldModel).toEqual({ licensePlate: '' });
});

test('successfully creates form model', () => {
  const mockFields = [
    {
      id: 'carModel',
      title: 'Car model',
      validationRegex: '^(?!\\s)(?!.*\\s$)[a-zA-Z0-9\\s\\.-]{1,64}$',
    },
    {
      id: 'licensePlate',
      title: 'License plate',
      validationRegex: '^([A-Z]){1,3}-([0-9]){1,3}$',
    },
  ];
  const formModel = createFormModel('test-form-name', mockFields);
  const expectedFormModel = { 'test-form-name': { carModel: '', licensePlate: '' } };

  expect(formModel).toEqual(expectedFormModel);
});

test('successfully creates field validation', () => {
  const mockField = {
    id: 'licensePlate',
    title: 'License plate',
    validationRegex: '^([A-Z]){1,3}-([0-9]){1,3}$',
  };
  const field = toValidationSchema({}, mockField);

  expect(field.licensePlate('123')).toEqual('License plate is not valid');
  expect(field.licensePlate('ABC-123')).toEqual(null);
});

test('successfully creates validation schema', () => {
  const mockFields = [
    {
      id: 'carModel',
      title: 'Car model',
      validationRegex: '^(?!\\s)(?!.*\\s$)[a-zA-Z0-9\\s\\.-]{1,64}$',
    },
    {
      id: 'licensePlate',
      title: 'License plate',
      validationRegex: '^([A-Z]){1,3}-([0-9]){1,3}$',
    },
  ];
  const validationSchema = createValidationSchema('test-form-name', mockFields);

  expect(validationSchema['test-form-name'].carModel('')).toEqual('Car model is not valid');
  expect(validationSchema['test-form-name'].carModel('Seat Leon')).toEqual(null);
  expect(validationSchema['test-form-name'].licensePlate('')).toEqual('License plate is not valid');
  expect(validationSchema['test-form-name'].licensePlate('1234')).toEqual('License plate is not valid');
  expect(validationSchema['test-form-name'].licensePlate('NS-434')).toEqual(null);
});
