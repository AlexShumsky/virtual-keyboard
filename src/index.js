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

  renderBaseHtmlStructure() {
    this.container.append(this.createElement(this.structure));
  }

  renderKeyboard() {
    const keyboardContainer = document.querySelector('.application__keyboard');
    const infoArea = document.querySelector('.application__field');

    function changeRegister(obj) {
      obj.register = obj.register.endsWith('mall') ? 'big' : 'small';
      obj.isCaps = true;
      createKeyboard(obj);
    }
    function changeShiftRegister(obj) {
      obj.register = obj.register.endsWith('mall') ? 'shBig' : 'shSmall';

      createKeyboard(obj);
    }
    function changeLanguage(obj) {
      function changeMessage(context) {
        const messageContainer = document.querySelector('.application__info');
        messageContainer.innerHTML = applicationMessage[context.language];
      }
      if (obj.language === 'en') {
        window.localStorage.setItem('language', 'ru');
      } else {
        window.localStorage.setItem('language', 'en');
      }
      obj.setLanguage();
      createKeyboard(obj);
      changeMessage(obj);
    }

    function checkDisabled(key) {
      switch (key) {
        case 'Del':
        case 'Backspace':
          infoArea.innerHTML = infoArea.innerHTML.slice(0, -1);
          break;
        case 'Enter':
          infoArea.innerHTML += '\n';
          break;
        case 'Space':
          infoArea.innerHTML += ' ';
          break;
        case 'Tab':
          infoArea.innerHTML += '    ';
          break;
      }
    }
    function buttonPress(button) {
      if (button) {
        button.classList.add('active');
      } else {
        return '';
      }
      if (!button.classList.contains('disable')) {
        infoArea.innerHTML += button.textContent;
      } else {
        checkDisabled(button.textContent);
      }
    }
    function buttonCancel(button) {
      if (button) {
        button.classList.remove('active');
      } else {
        return '';
      }
      if (!button.classList.contains('disable')) {
        infoArea.innerHTML += button.textContent;
      }
    }
    function keyboardListener(obj) {
      window.addEventListener('keydown', function (ev) {
        ev.preventDefault();
        let key;
        if (
          !ev.code.endsWith('Right') ||
          ev.code === 'BracketRight' ||
          ev.code === 'ArrowRight'
        ) {
          key = document.querySelector(`.key${ev.keyCode}`);
        } else {
          key = document.querySelector(`.key${ev.keyCode}db`);
        }

        buttonPress(key);
        console.log(key);
        if (ev.altKey && ev.ctrlKey) changeLanguage(obj);
        if (ev.key === 'CapsLock') {
          changeRegister(obj);
        }
        if (ev.key === 'Shift') {
          changeShiftRegister(obj);
        }
      });
      window.addEventListener('keyup', function (ev) {
        ev.preventDefault();
        let key;
        if (
          !ev.code.endsWith('Right') ||
          ev.code === 'BracketRight' ||
          ev.code === 'ArrowRight'
        ) {
          key = document.querySelector(`.key${ev.keyCode}`);
        } else {
          key = document.querySelector(`.key${ev.keyCode}db`);
        }
        if (ev.key === 'Shift') {
          changeRegister(obj);
        }
        buttonCancel(key);
      });
    }
    function showActiveButtons() {
      keyboardContainer.addEventListener('click', function (ev) {
        ev.preventDefault();
        if (ev.target.classList.contains('key')) {
          if (!ev.target.classList.contains('disable')) {
            infoArea.innerHTML += ev.target.textContent;
          } else {
            const disabledKey = ev.target.textContent;
            checkDisabled(disabledKey);
          }
        }
      });
    }
    function setKeyAttributes(el, key, obj = false) {
      el.classList.add('key');
      el.classList.add(key);
      el.setAttribute('data-key', key);
      if (obj.isCaps && el.textContent === 'Caps Lock')
        el.classList.add('active');
      if (large.includes(el.textContent)) el.classList.add('large');
      if (el.textContent === 'Space') el.classList.add('superLarge');
    }
    function renderKeys(el) {
      const key = document.createElement('div');
      if (typeof el === 'string') {
        key.textContent = el;
      
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
