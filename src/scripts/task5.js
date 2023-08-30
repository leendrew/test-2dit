import { buildCanvasHtml, htmlLegendPlugin, onChartHover } from './chart.js';
import { addClass, mapAndJoinHtml, toggleClass } from './utils.js';

const labelsBGColors = ['#E83D46', '#F9A620', '#000000', '#005FA7', '#808080'];

export const task5Data = [
  {
    title: 'Страны',
    countType: '.шт',
    countPrefix: null,
    items: [
      {
        id: 0,
        title: 'Россия',
        value: 1005,
      },
      {
        id: 1,
        title: 'Казахстан',
        value: 670,
      },
      {
        id: 2,
        title: 'Узбекистан',
        value: 335,
      },
    ],
  },
  {
    title: 'Города',
    countType: '.шт',
    countPrefix: null,
    items: [
      {
        id: 0,
        title: 'Тюмень',
        value: 1005,
      },
      {
        id: 1,
        title: 'Нур-Султан',
        value: 670,
      },
      {
        id: 2,
        title: 'Ташкент',
        value: 335,
      },
      {
        id: 3,
        title: 'Петербург',
        value: 335,
      },
      {
        id: 4,
        title: 'Алма-Аты',
        value: 335,
      },
    ],
  },
  {
    title: 'Страны',
    countType: '.млн',
    countPrefix: '$',
    items: [
      {
        id: 0,
        title: 'Россия',
        value: 65,
      },
      {
        id: 1,
        title: 'Казахстан',
        value: 43,
      },
      {
        id: 2,
        title: 'Узбекистан',
        value: 22,
      },
    ],
  },
  {
    title: 'Города',
    countType: '.млн',
    countPrefix: '$',
    items: [
      {
        id: 0,
        title: 'Тюмень',
        value: 22,
      },
      {
        id: 1,
        title: 'Нур-Султан',
        value: 43,
      },
      {
        id: 2,
        title: 'Ташкент',
        value: 22,
      },
      {
        id: 3,
        title: 'Петербург',
        value: 22,
      },
      {
        id: 4,
        title: 'Алма-Аты',
        value: 21,
      },
    ],
  },
];

function buildChartConfig(
  labels,
  data,
  labelsBGColors,
  countPrefix,
  countType,
  onChartHoverFn,
  ...plugins
) {
  return {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labelsBGColors,
          borderWidth: 0,
          cutout: '75%',
          hoverOffset: 15,
          countPrefix,
          countType,
        },
      ],
    },
    options: {
      onHover: onChartHoverFn,
      layout: {
        padding: 15,
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
    },
    plugins,
  };
}

function buildCardHtml(title) {
  const cardNode = document.createElement('div');
  addClass(cardNode, 'cards__card');
  addClass(cardNode, 'card');

  const titleNode = document.createElement('span');
  addClass(titleNode, 'card__title');
  const titleText = document.createTextNode(title);
  titleNode.appendChild(titleText);

  const chartNode = document.createElement('div');
  addClass(chartNode, 'card__chart');
  addClass(chartNode, 'chart');

  const countNode = document.createElement('div');
  addClass(countNode, 'chart__count');
  addClass(countNode, 'count');
  const valueNode = document.createElement('span');
  addClass(valueNode, 'count__value');
  const typeNode = document.createElement('span');
  addClass(typeNode, 'count__type');
  countNode.appendChild(valueNode);
  countNode.appendChild(typeNode);

  chartNode.appendChild(countNode);

  const legendNode = document.createElement('ul');
  addClass(legendNode, 'card__legend');
  addClass(legendNode, 'legend');

  cardNode.appendChild(titleNode);
  cardNode.appendChild(chartNode);
  cardNode.appendChild(legendNode);

  return cardNode;
}

export const task5Listeners = {
  change: {
    '.switch__checkbox': function onSwitchClick({ target }) {
      const periodParent = target.closest('.inner__period');
      const periodLeft = periodParent.querySelector('.period__left');
      const periodRight = periodParent.querySelector('.period__right');
      const isActive = periodLeft.classList.contains('active');
      toggleClass(periodLeft, 'active', isActive);
      toggleClass(periodRight, 'active', !isActive);
    },
  },
  DomContentLoaded: {
    document: function onDomLoaded() {
      const task5Node = document.querySelector('.task5');
      const cardsContainerNode = task5Node.querySelector('.cards');
      for (let i = 0; i < task5Data.length; i++) {
        const chartData = task5Data[i];
        const cardNode = buildCardHtml(chartData.title);
        const chartNode = cardNode.querySelector('.card__chart');
        const canvas = buildCanvasHtml();
        chartNode.appendChild(canvas);
        cardsContainerNode.appendChild(cardNode);

        const chartLabels = [];
        const chartLabelsData = [];
        for (const item of chartData.items) {
          chartLabels.push(item.title);
          chartLabelsData.push(item.value);
        }
        const chartConfig = buildChartConfig(
          chartLabels,
          chartLabelsData,
          labelsBGColors,
          chartData.countPrefix,
          chartData.countType,
          onChartHover,
          htmlLegendPlugin,
        );
        new Chart(canvas, chartConfig);
      }
    },
  },
};

export function setupTask5Listeners(listeners, chartData) {
  const task5Node = document.querySelector('.task5');

  Object.entries(listeners).forEach(([eventType, handlers]) => {
    for (const selector in handlers) {
      if (eventType === 'DomContentLoaded' && selector === 'document') {
        handlers[selector](chartData);
        continue;
      }
      const element = task5Node.querySelector(selector);
      if (!element) continue;
      const handler = handlers[selector];
      element.addEventListener(eventType, handler);
    }
  });
}

export function buildTask5Html() {
  return `
    <section class="task5">
      <div class="container">
        <div class="task5__inner inner">
          <div class="inner__period period">
            <span class="period__left active">Предыдущий период</span>
            <label class="switch">
              <input class="switch__checkbox visually-hidden" type="checkbox" />
              <div class="switch__icon"></div>
            </label>
            <span class="period__right">План</span>
          </div>
          <h1 class="inner__title title">Продажи</h1>
          <div class="inner__text text">
            <span class="text__left">Количество проданных пицц</span>
            <span class="text__right">Выручка</span>
          </div>
          <div class="inner__cards cards"></div>
        </div>
      </div>
    </section>
  `;
}
