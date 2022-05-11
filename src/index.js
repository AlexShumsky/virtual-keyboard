import './styles/style.scss';
import { keyboardObj } from './languages';
import { applicationMessage } from './languages';
const large = ['Backspace', 'Caps Lock', 'Enter', 'Shift'];
class Application {
  constructor() {
    this.container = document.querySelector('body');
    this.template = document.createElement('template');
    this.language = 'en';
    this.register = 'small';
    this.shiftRegister = 'shSmall';
    this.isCaps = false;
    this.structure = `
<div class="wrapper">
    <div class="application">
      <h1 class="application__title">Virtual Keyboard</h1>
      <textarea  class="application__field" cols="30" rows="10"></textarea>
      <div class="application__keyboard"></div>
      <div class="application__info">${applicationMessage[this.language]}
      </div>
    </div>
</div>`;
  }

  setLanguage() {
    const currentLanguage = window.localStorage.getItem('language');
    if (currentLanguage) {
      this.language = currentLanguage;
    } else {
      window.localStorage.setItem('language', 'en');
    }
  }

  createElement(element) {
    this.template.innerHTML = element;
    const cusomElement = this.template.content.firstElementChild;
    return cusomElement;
  }

        keyboardContainer.append(keyboardRow);
      });
    }
    createKeyboard(this);
    showActiveButtons();
    keyboardListener(this);
  }

  run() {
    this.renderBaseHtmlStructure();
    this.setLanguage();
    this.renderKeyboard();
  }
}
const Keyboard = new Application();
Keyboard.run();
