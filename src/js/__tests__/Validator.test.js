import Validator from '../Validator';

const validator = new Validator();

test.each([
  ['4532135516020754421', 'pass'],
  ['2720992547457930', 'pass'],
  ['373777066772742', 'pass'],
  ['6011101574664025577', 'pass'],
  ['5564444494462555477', 'fail'],
  ['7864566886454', 'fail'],
])(
  ('Проверяет контрольную сумму'),
  (input, expected) => {
    expect(validator.check(input)).toBe(expected);
  },
);
