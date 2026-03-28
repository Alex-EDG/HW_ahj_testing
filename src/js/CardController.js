import PaymentSystem from './PaymentSystem';
import Validator from './Validator';

export default class CardController {
  constructor(cardUi) {
    this.cardUi = cardUi;
    this.paymentSystem = new PaymentSystem(this.cardUi.cards);
    this.validator = new Validator();
    this.match = [];
  }

  init() {
    this.cardUi.drawUi();
    this.cardUi.formEl.addEventListener('submit', () => false);
    this.cardUi.inputEl.setAttribute('maxlength', 19);

    this.cardUi.inputEl.addEventListener('input', () => {
      this.match = this.paymentSystem.check(this.cardUi.inputEl.value);

      this.cardUi.cards.forEach((card) => {
        const cardEl = document.getElementById(`${card.image}`);
        cardEl.classList.remove('bright');
        if (this.match.includes(card)) {
          cardEl.classList.add('bright');
        }
      });
    });

    this.cardUi.btnEl.addEventListener('click', (event) => {
      event.preventDefault();

      const titleEl = this.cardUi.messageEl.querySelectorAll('.cardTitle');
      if (titleEl.length) {
        Array.from(titleEl).forEach((elem) => {
          elem.remove();
        });
      }
      this.cardUi.clearStatus();

      let inputStatus;
      let messageStatus;
      let messageTitle;
      let validate = this.validator.check(this.cardUi.inputEl.value);

      if (validate === 'pass' && this.match.length === 0) {
        validate = 'fail';
      }

      if (validate === 'pass') {
        inputStatus = 'valid';
        messageStatus = 'messageValid';
        messageTitle = 'действителен.';
      } else {
        inputStatus = 'invalid';
        messageStatus = 'messageInvalid';
        messageTitle = 'не действующий!';
      }

      this.cardUi.showStatus(inputStatus, messageStatus);

      const cardTitleEl = document.createElement('div');
      cardTitleEl.className = 'cardTitle';

      if (this.match.length) {
        this.match.forEach((card) => {
          cardTitleEl.innerHTML = `Платежная система: ${card.paymentSystem}  - Номер кредитной карты: ${messageTitle}`;
        });
      } else {
        cardTitleEl.innerHTML = 'ВНИМАНИЕ! Не могу определить платежную систему';
      }
      this.cardUi.messageEl.append(cardTitleEl);
    });
  }
}
