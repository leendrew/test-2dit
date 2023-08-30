import { mapAndJoinHtml } from './utils.js';

const MAX_ITEMS = 16;

export const task2Data = Array.from({ length: MAX_ITEMS }).map((_, i) => {
  const category = 'Кресла театральные';
  const name = 'Театральное кресло Прайм';
  const code = '789-2341';
  const price = '6 782';
  let labelType = null;
  let inStock = false;
  let imageUrl = './src/images/armchair-gray.jpg';

  if (i === 0) {
    labelType = 'bestseller';
    inStock = true;
  }

  if (i === 1) {
    labelType = 'promotion';
    inStock = true;
    imageUrl = './src/images/armchair-blue.jpg';
  }

  if (i === 2) {
    labelType = 'new';
    inStock = true;
  }

  return {
    id: i,
    category,
    name,
    code,
    price,
    labelType,
    inStock,
    imageUrl,
  };
});

const labelsTypeMap = {
  bestseller: {
    title: 'хит продаж',
    iconUrl: './src/images/star.svg',
  },
  promotion: {
    title: 'акция',
    iconUrl: './src/images/discount.svg',
  },
  new: {
    title: 'новинка',
    iconUrl: './src/images/rocket.svg',
  },
};

function buildLabelHtml(type, data) {
  const { title, iconUrl } = data;
  if (type !== 'stock') {
    return `
      <div class="label label__functional ${type}">
        <div class="${type}__icon">
          <img src="${iconUrl}" alt="${title}" role="presentation" />
        </div>
        <span class="${type}__title">${title}</span>
      </div>
    `;
  }
}

function buildStockHtml() {
  return `
    <div class="label label__stock stock">
      <div class="stock__icon">
        <img src="./src/images/check-mark.svg" alt="в наличии" role="presentation" />
      </div>
      <span class="stock__title">в наличии</span>
    </div>
  `;
}

function buildCardHtml(data) {
  const { category, name, code, price, labelType, inStock, imageUrl } = data;
  const labelData = labelsTypeMap[labelType];
  return `
    <article class="items__item item">
      <div class="item__img">
        <img src="${imageUrl}" alt="${name}" />
        ${labelType ? buildLabelHtml(labelType, labelData) : ''}
        ${inStock ? buildStockHtml() : ''}
      </div>
      <div class="item__content content">
        <span class="content__inner category">${category}</span>
        <span class="content__inner name">${name}</span>
        <span class="content__inner code">
          <span class="code__title">Артикул: </span>
          <span class="code__value">${code}</span>
        </span>
        <span class="content__inner price">
          <div class="price__title">
            от:
            <span class="price__value">${price}</span>
            Р
          </div>
        </span>
      </div>
    </article>
  `;
}

export function buildTask2Html(data) {
  return `
    <section class="task2">
      <div class="container">
        <div class="task2__inner items">
          ${mapAndJoinHtml(data, (data) => buildCardHtml(data))}
        </div>
      </div>
    </section>
  `;
}
