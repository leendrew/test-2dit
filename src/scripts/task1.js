import { mapAndJoinHtml, toggleClass } from './utils.js';

export const task1Data = {
  block: {
    title: 'На что рассчитывать при взыскании неустойки по ДДУ?',
    paragraphs: [
      'Когда застройщик нарушает сроки сдачи по ДДУ, вы как дольщик имеете право требовать неустойку за просрочку, а также компенсацию убытков, вызванных этой просрочкой.',
      'Само собой, застройщику невыгодно добровольно выплачивать вам компенсацию. Когда дело доходит до суда, суд урезает сумму неустойки на основании ст. 333 ГК РФ. Это урезание практически неизбежно.',
      'Основная наша задача состоит в том, чтобы взыскать неустойку по ДДУ в максимальном размере, т.е. избежать сильного ее урезания. Вот что вы можете требовать от застройщика.',
    ],
  },
  accordions: [
    {
      title: 'Выплата неустойки по ДДУ',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam.',
    },
    {
      title: 'Компенсация морального вреда',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam.',
    },
    {
      title: 'Штраф в размере 50%',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam.',
    },
    {
      title: 'Компенсация расходов по аренде жилья',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam.',
    },
    {
      title: 'Компенсация убытков по ипотеке',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam.',
    },
    {
      title: 'Возмещение иных расходов',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam.',
    },
  ],
};

function buildBlockParagraphHtml(content) {
  return `
    <p class="text__paragraph">${content}</p>
  `;
}

function buildBlockHtml(data) {
  const { title, paragraphs } = data;
  return `
    <div class="inner__item text">
      <h2 class="text__title">${title}</h2>
      <div class="text__paragraphs">
        ${mapAndJoinHtml(paragraphs, (content) => buildBlockParagraphHtml(content))}
      </div>
      </h2>
    </div>
  `;
}

const buildAccordionPanelHtml = (title, content) => {
  return `
      <div class="accordion__panel panel">
      <div class="panel__header header">
        <h2 class="header__title">${title}</h2>
        <button class="header__arrow arrow" type="button">
          <svg class="arrow__icon" width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M1.41815 3.38895L5.41815 7.38895L9.41815 3.38895"
              stroke="#283F75"
              stroke-width="1.5"
              stroke-linecap="square"
            />
          </svg>
        </button>
      </div>
      <div class="panel__content content">
        <div class="content__inner">
          <p class="content__text">${content}</p>
        </div>
      </div>
    </div>
  `;
};

function buildAccordionHtml(data) {
  return `
    <div class="inner__item accordion">
      ${mapAndJoinHtml(data, ({ title, content }) => buildAccordionPanelHtml(title, content))}
    </div>
  `;
}

export function buildTask1Html(data) {
  const { block, accordions } = data;
  return `
    <section class="task1">
      <div class="container">
        <div class="task1__inner inner">
        ${buildBlockHtml(block)}
        ${buildAccordionHtml(accordions)}
        </div>
      </div>
    </section
  `;
}

export const task1Listeners = {
  click: {
    '.panel': function onPanelClickHandler({ target }) {
      const parent = target.closest('.panel');
      const isHaveActiveClass = parent.classList.contains('active');
      toggleClass(parent, 'active', isHaveActiveClass);
    },
  },
};

export function setupTask1Listeners(listeners) {
  const task1Node = document.querySelector('.task1');

  Object.entries(listeners).forEach(([eventType, handlers]) => {
    task1Node.addEventListener(eventType, (e) => {
      for (const selector in handlers) {
        const element = document.querySelector(selector);
        if (!element) continue;
        if (!e.target.closest(selector)) continue;
        handlers[selector](e);
      }
    });
  });
}
