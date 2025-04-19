export function createElement(type: string = 'span', classNames: string = ''): HTMLElement {
  const element = document.createElement(type);
  element.className = classNames;
  document.body.appendChild(element);
  return element;
}