import { mapAndJoinHtml, debounce } from './utils.js';

export const task3Data = [
  {
    id: 0,
    title: 'С расчетного счета компании',
    imageUrl: './src/images/checking-account.jpg',
    content:
      'Diam aliquam quis blandit sollicitudin sit ut venenatis dictum fusce gravida, porta commodo natoque tristique magna massa laoreet luctus. Ligula per justo condimentum et ut dignissim ipsum, consequat tristique sollicitudin convallis bibendum risus lorem nostra, cubilia purus odio tincidunt amet euismod. Luctus nascetur urna adipiscing nisl libero bibendum maecenas accumsan mi, ligula consectetur congue nam magnis posuere purus. Himenaeos habitasse nunc sociosqu erat aliquam class justo porta dictumst, pulvinar id dignissim facilisi dolor tincidunt in non tellus, nam posuere laoreet turpis diam ut placerat lacus. Facilisi nec sagittis interdum blandit urna turpis sociosqu risus, viverra class odio aliquet cras morbi nunc egestas convallis, habitasse mollis mi maximus donec congue commodo. Rutrum turpis diam ut placerat lacus. Facilisi nec sagittis interdum blandit urna turpis sociosqu risus, viverra class odio aliquet cras morbi nunc egestas convallis, habitasse mollis mi maximus donec congue commodo. Rutrum',
  },
  {
    id: 1,
    title: 'С карты через онлайн банк физлица или в отделении банка',
    imageUrl: './src/images/bank-branch.jpg',
    content:
      'Diam aliquam quis blandit sollicitudin sit ut venenatis dictum fusce gravida, porta commodo natoque tristique magna massa laoreet luctus. Ligula per justo condimentum et ut dignissim ipsum, consequat tristique sollicitudin convallis bibendum risus lorem nostra, cubilia purus odio tincidunt amet euismod. Luctus nascetur urna adipiscing nisl libero bibendum maecenas accumsan mi, ligula consectetur congue nam magnis posuere purus. Himenaeos habitasse nunc sociosqu erat aliquam class justo porta dictumst, pulvinar id dignissim facilisi dolor tincidunt in non tellus, nam posuere laoreet turpis diam ut placerat lacus.',
  },
  {
    id: 2,
    title: 'С карты через онлайн банк физлица или в отделении банка',
    imageUrl: './src/images/bank-branch.jpg',
    content:
      'Diam aliquam quis blandit sollicitudin sit ut venenatis dictum fusce gravida, porta commodo natoque tristique magna massa laoreet luctus. Ligula per justo condimentum et ut dignissim ipsum, consequat tristique sollicitudin convallis bibendum risus lorem nostra, cubilia purus odio tincidunt amet euismod. Luctus nascetur urna adipiscing nisl libero bibendum maecenas accumsan mi, ligula consectetur congue nam magnis posuere purus. Himenaeos habitasse nunc sociosqu erat aliquam class justo porta dictumst, pulvinar id dignissim facilisi dolor tincidunt in non tellus, nam posuere laoreet turpis diam ut placerat lacus.',
  },
];

function getOrderNumber(id) {
  const orderNumber = id + 1;
  return orderNumber.toString().length > 1 ? `.${orderNumber}` : `.0${orderNumber}`;
}

function buildColumnHtml(id, title, content, imageUrl) {
  return `
    <div class="inner__column column">
      <div class="column__item text">
        <div class="text__header title">
          <span class="title__number">${getOrderNumber(id)}</span>
          <h2 class="title__text">${title}</h2>
        </div>
        <div class="text__content">${content}</div>
      </div>
      <div class="column__item image">
        <img class="image__content" src="${imageUrl}" alt="Презентационная картинка" role="presentation" />
      </div>
    </div>
  `;
}

export function buildTask3Html(data) {
  return `
    <section class="task3">
      <div class="container">
        <div class="task3__inner inner">
          ${mapAndJoinHtml(data, ({ id, title, content, imageUrl }) =>
            buildColumnHtml(id, title, content, imageUrl),
          )}
        </div>
      </div>
    </section>
  `;
}

function calculateTextMargins() {
  const elements = document.querySelectorAll('.task3 .text');
  for (let i = 0; i < elements.length; i++) {
    const titleNode = elements[i].querySelector('.text__header');
    const contentNode = elements[i].querySelector('.text__content');
    const titleHeight = titleNode.offsetHeight;
    const viewportWidth = window.innerWidth;
    contentNode.style.marginTop = `${titleHeight + 5}px`;
    if (viewportWidth < 576) {
      if ((i + 1) % 2 === 0) {
        contentNode.style.marginTop = '5px';
      }
    }
  }
}

const debouncedCalculateTextMargins = debounce(calculateTextMargins, 200);

export function setupTask3Listeners() {
  calculateTextMargins();
  window.addEventListener('resize', debouncedCalculateTextMargins);
}
