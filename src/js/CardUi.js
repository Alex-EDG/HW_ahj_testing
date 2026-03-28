import americanExpress from '../img/american_express.png';
import discover from '../img/discover.png';
import jcb from '../img/jcb.png';
import mastercard from '../img/mastercard.png';
import mir from '../img/mir.png';
import visa from '../img/visa.png';

export default class CardUi {
  constructor(cards) {
    this.cards = cards;
    this.container = null;
    this.images = {
      mir,
      visa,
      mastercard,
      'american-express': americanExpress,
      discover,
      jcb,
    };
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Контейнер не является элементом "HTMLElement"');
    }
    this.container = container;
  }

  drawUi() {
    const formEl = document.createElement('form');
    formEl.setAttribute('data-widget', 'creditCard-form-widget');
    this.container.append(formEl);

    const logosEl = document.createElement('div');
    logosEl.classList.add('form-logo');
    formEl.append(logosEl);
    this.cards.forEach((card) => {
      if (!this.container.querySelector(`${card.image}`)) {
        const imgEl = document.createElement('img');
        imgEl.id = card.image;
        imgEl.classList.add('logo');
        const image = this.images[card.image];
        imgEl.src = image;
        imgEl.alt = card.paymentSystem;
        logosEl.append(imgEl);
      }
    });

    const containerEl = document.createElement('div');
    containerEl.classList.add('form-container');
    formEl.append(containerEl);
    const controlEl = document.createElement('div');
    controlEl.classList.add('form-control');
    containerEl.append(controlEl);
    const labelEl = document.createElement('label');
    labelEl.setAttribute('for', 'creditCard-input');
    controlEl.append(labelEl);
    const inputEl = document.createElement('input');
    inputEl.id = 'creditCard-input';
    inputEl.setAttribute('data-id', 'creditCard-input');
    inputEl.setAttribute('type', 'text');
    controlEl.append(inputEl);
    const formBtnEl = document.createElement('div');
    formBtnEl.classList.add('form-button');
    containerEl.append(formBtnEl);
    const btnEl = document.createElement('button');
    btnEl.setAttribute('data-id', 'creditCard-submit');
    btnEl.textContent = 'Проверить карту';
    formBtnEl.append(btnEl);

    const messageEl = document.createElement('div');
    messageEl.classList.add('form-message');
    formEl.append(messageEl);

    this.formEl = this.container.querySelector('[data-widget="creditCard-form-widget"]');
    this.inputEl = this.container.querySelector('[data-id="creditCard-input"]');
    this.btnEl = this.container.querySelector('[data-id="creditCard-submit"]');
    this.messageEl = this.container.querySelector('.form-message');
    this.logoColection = this.container.querySelectorAll('.logo');
  }

  showStatus(inputStatus, messageStatus) {
    this.messageEl.classList.add(messageStatus);
    this.inputEl.classList.add(inputStatus);
  }

  clearStatus() {
    const msList = this.messageEl.classList;
    const msFiltered = Array.from(msList).filter((item) => item === 'messageValid' || item === 'messageInvalid');

    if (msFiltered.length) {
      this.messageEl.classList.remove(msFiltered);
    }
    const inList = this.inputEl.classList;
    const inFiltered = Array.from(inList).filter((item) => item === 'valid' || item === 'invalid');

    if (inFiltered.length) {
      this.inputEl.classList.remove(inFiltered);
    }
  }
}
