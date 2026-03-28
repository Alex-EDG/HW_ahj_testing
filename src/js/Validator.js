export default class Validator {
  constructor() {
    this.sum = 0;
    this.nDigits = 0;
    this.parity = 0;
  }

  check(input) {
    this.nDigits = input.length;
    this.sum = parseInt(input[this.nDigits - 1], 10);
    this.parity = this.nDigits % 2;
    for (let i = 0; i <= this.nDigits - 2; i += 1) {
      let digit = parseInt(input[i], 10);
      if (i % 2 === this.parity) digit *= 2;
      if (digit > 9) digit -= 9;
      this.sum += digit;
    }
    if ((this.sum % 10) === 0 && input !== 0) return 'pass';
    return 'fail';
  }
}
