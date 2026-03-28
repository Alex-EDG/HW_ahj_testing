import PaymentSystem from '../PaymentSystem';
import cards from '../Utils';

const paymentSystem = new PaymentSystem(cards);

test.each([
  ['2200000000000000', [{
    paymentSystem: 'МИР',
    regex: '^220\\d*',
    ln: 16,
    image: 'mir',
  }]],

  ['4532135516020754421', [{
    paymentSystem: 'Visa',
    regex: '^4[0-9]{12}(?:[0-9]{3})(?:[0-9]{3})?$',
    ln: [13, 16, 19],
    image: 'visa',
  }]],

  ['2720992547457930', [{
    paymentSystem: 'MasterCard',
    regex: '^((2720[0-9]{2})|(27[0-1][0-9]{3})|(2[3-6][0-9]{4})|(22[3-9][0-9]{3})|(222[1-9][0-9]{2})|(5[1-5]))\\d*',
    ln: 16,
    image: 'mastercard',
  }]],

  ['373777066772742', [{
    paymentSystem: 'American Express',
    regex: '^3[47][0-9]{13}',
    ln: 15,
    image: 'american-express',
  }]],

  ['6011101574664025577', [{
    paymentSystem: 'Discover',
    regex: '^((62292[0-5])|(6229[0-1][0-9]{1})|(622[2-8][0-9]{2})|(6221[3-9][0-9]{1})|(62212[6-9])|(64[4-9])|(6011)|(65))\\d*',
    ln: [16, 19],
    image: 'discover',
  }]],

  ['3530432814962802935', [{
    paymentSystem: 'JCB',
    regex: '^((35[3-8][0-9]{1})|(352[8-9]))\\d*',
    ln: [16, 19],
    image: 'jcb',
  }]],
])(
  ('Возвращает правильно определенную платежную систему'),
  (input, expected) => {
    const result = paymentSystem.check(input);
    for (let n = 0; n < result.length; n += 1) {
      expect(result[n]).toEqual(expected[n]);
    }
  },
);
