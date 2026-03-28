import CardUi from './CardUi';
import cards from './Utils';
import CardController from './CardController';

const cardUi = new CardUi(cards);
cardUi.bindToDOM(document.querySelector('#card-container'));

const cardCtrl = new CardController(cardUi);
cardCtrl.init();
