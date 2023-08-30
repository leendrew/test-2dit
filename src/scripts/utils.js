export function mapAndJoinHtml(array, fn, s = '') {
  return array.map(fn).join(s);
}

export function addClass(node, className) {
  node.classList.add(className);
}

export function removeClass(node, className) {
  node.classList.remove(className);
}

export function toggleClass(node, className, condition) {
  condition ? node.classList.remove(className) : node.classList.add(className);
}

export function removeAllChild(node) {
  while (node.firstChild) {
    node.firstChild.remove();
  }
}

export function debounce(fn, ms) {
  let timeoutId;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => fn(...args), ms);
  };
}
