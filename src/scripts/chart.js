import { addClass, removeClass, removeAllChild } from './utils.js';

export function buildCanvasHtml() {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', '200');
  canvas.setAttribute('height', '200');
  return canvas;
}

function buildLegendItemHtml(pinBGColor, title, isHidden) {
  const legendLabelNode = document.createElement('li');
  addClass(legendLabelNode, 'legend__item');
  addClass(legendLabelNode, 'item');

  const legendItemPinNode = document.createElement('div');
  legendItemPinNode.style.backgroundColor = pinBGColor;
  addClass(legendItemPinNode, 'item__pin');

  const legendItemTitleNode = document.createElement('span');
  addClass(legendItemTitleNode, 'item__value');
  !isHidden ? addClass(legendItemTitleNode, 'active') : removeClass(legendItemTitleNode, 'active');
  isHidden ? addClass(legendItemTitleNode, 'hidden') : removeClass(legendItemTitleNode, 'hidden');
  const legendItemTitleText = document.createTextNode(title);

  legendItemTitleNode.appendChild(legendItemTitleText);
  legendLabelNode.appendChild(legendItemPinNode);
  legendLabelNode.appendChild(legendItemTitleNode);

  return legendLabelNode;
}

export function onChartHover(e, items, chart) {
  const [item] = items;
  const cardContainerNode = chart.canvas.closest('.cards__card');
  const countContainerNode = cardContainerNode.querySelector('.chart__count');
  const dataset = chart.data.datasets[0];
  const legendLabels = chart.options.plugins.legend.labels.generateLabels(chart);
  const { countType, countPrefix, data } = dataset;
  let total;

  if (item === undefined) {
    total = calculateTotal(legendLabels, data);
  } else {
    const { index } = item;
    total = data[index];
  }
  updateTotal(countContainerNode, total, countType, countPrefix);
}

function updateTotal(countContainerNode, countValue, newCountType, countPrefix) {
  const countValueNode = countContainerNode.querySelector('.count__value');
  const countTypeNode = countContainerNode.querySelector('.count__type');
  const newCountValue = `${countPrefix ? countPrefix : ''} ${countValue}`;
  countValueNode.textContent = newCountValue;
  countTypeNode.textContent = newCountType;
}

function calculateTotal(labelsData, data) {
  return labelsData.reduce((acc, label) => {
    if (label.hidden) {
      return acc;
    }
    const value = data[label.index];
    return acc + value;
  }, 0);
}

export const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const cardContainerNode = chart.canvas.closest('.cards__card');
    const countContainerNode = cardContainerNode.querySelector('.chart__count');
    const legendLabelsContainerNode = cardContainerNode.querySelector('.card__legend');

    removeAllChild(legendLabelsContainerNode);

    const legendLabels = chart.options.plugins.legend.labels.generateLabels(chart);
    const dataset = chart.data.datasets[0];
    const { countType, countPrefix, data } = dataset;

    const total = calculateTotal(legendLabels, data);
    updateTotal(countContainerNode, total, countType, countPrefix);

    legendLabels.forEach((label) => {
      const legendLabelNode = buildLegendItemHtml(label.fillStyle, label.text, label.hidden);

      legendLabelNode.onclick = () => {
        const { type } = chart.config;
        if (type === 'pie' || type === 'doughnut') {
          chart.toggleDataVisibility(label.index);
        } else {
          chart.setDatasetVisibility(
            label.datasetIndex,
            !chart.isDatasetVisible(label.datasetIndex),
          );
        }
        chart.update();
      };

      legendLabelsContainerNode.appendChild(legendLabelNode);
    });
  },
};
