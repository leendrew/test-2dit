import { addClass, removeClass } from './utils.js';

const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const phoneMaskOption = {
  mask: '+{7}(000)000-00-00',
};

export function buildTask4Html() {
  return `
    <section class="task4">
      <div class="container">
        <div class="task4__inner block">
          <h1 class="block__title">Оставьте заявку</h1>
          <span class="block__subtitle">И наш специалист свяжется с вами</span>
          <form class="block__form form">
            <label class="form__item">
              <input class="form__input name" type="text" name="name" placeholder="Ваше имя" required/>
              <span class="error"></span>
            </label>
            <label class="form__item phone">
              <img
                class="phone__icon"
                src="./src/images/russian-flag.svg"
                alt="Russian flag icon"
              />
              <input class="phone__input" type="text" name="phone" placeholder="Телефон" required >
              <span class="phone__error error"></span>
            </input>
            </label>
            <label class="form__item">
              <input class="form__input email" type="text" name="email" placeholder="Эл. почта" required />
              <span class="email__error error"></span>
            </label>
            <p class="form__item check">
              Нажимая кнопку, я принимаю
              <span class="check__rules">пользовательское соглашение</span>, соглашаюсь с политикой
              конфиденциальности, условиями пользования сайтом, передачей и обработкой моих
              персональных данных
            </p>
            <button class="form__item submit" type="submit">Оформить заявку</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

let form = null;
let emailInput = null;
let emailParent = null;
let emailError = null;
let phoneInput = null;
let phoneParent = null;
let phoneError = null;
let phoneIcon = null;
let phoneMask = null;

function clearErrors() {
  removeClass(phoneParent, 'show-error');
  removeClass(emailParent, 'show-error');
  phoneError.innerText = '';
  emailError.innerText = '';
}

function getDataFromFormData(eventTarget) {
  const data = {};
  const formData = new FormData(eventTarget);
  for (const key of formData.keys()) {
    data[key] = formData.get(key);
  }
  return data;
}

export const task4Listeners = {
  focus: {
    'input[name="phone"]': function onPhoneInputFocus() {
      addClass(phoneParent, 'focus');
      addClass(phoneIcon, 'show');
      const phoneInput = form.querySelector('input[name="phone"]');
      phoneInput.setAttribute('placeholder', '+7(___)___-__-__');
    },
  },
  blur: {
    'input[name="phone"]': function onPhoneInputBlur() {
      removeClass(phoneParent, 'focus');
      if (!phoneInput.value) {
        removeClass(phoneIcon, 'show');
        phoneInput.setAttribute('placeholder', 'Телефон');
      }
    },
  },
  submit: {
    '.form': function onSubmit(e) {
      e.preventDefault();
      clearErrors();

      const emailInputValue = emailInput.value;
      const isEmailValid = emailRegExp.test(emailInputValue);
      if (!isEmailValid) {
        emailError.innerText = 'Некорректный email';
        addClass(emailParent, 'show-error');
      }

      const phoneInputValue = phoneMask.unmaskedValue;
      const isPhoneValid = phoneInputValue.length === 11;
      if (!isPhoneValid) {
        phoneError.innerText = 'Телефон заполнен не до конца';
        addClass(phoneParent, 'show-error');
      }

      if (!isEmailValid || !isPhoneValid) return;

      const data = getDataFromFormData(e.target);
      data['phone'] = phoneMask.unmaskedValue;
      console.log(data);
    },
  },
  DomContentLoaded: {
    document: function onDomLoaded() {
      form = document.querySelector('.task4 .form');
      emailInput = form.querySelector('input[name="email"]');
      emailParent = emailInput.closest('.form__item');
      emailError = emailParent.querySelector('.email__error');
      phoneInput = form.querySelector('input[name="phone"]');
      phoneParent = phoneInput.closest('.form__item');
      phoneError = phoneParent.querySelector('.phone__error');
      phoneIcon = phoneParent.querySelector('.phone__icon');
      phoneMask = IMask(phoneInput, phoneMaskOption);
    },
  },
};

export function setupTask4Listeners(listeners) {
  const task4Node = document.querySelector('.task4');

  Object.entries(listeners).forEach(([eventType, handlers]) => {
    for (const selector in handlers) {
      if (eventType === 'DomContentLoaded' && selector === 'document') {
        handlers[selector]();
        continue;
      }
      const element = task4Node.querySelector(selector);
      if (!element) continue;
      const handler = handlers[selector];
      element.addEventListener(eventType, handler);
    }
  });
}
