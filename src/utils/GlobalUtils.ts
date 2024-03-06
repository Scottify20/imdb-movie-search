export function insertHTMLInsideElementById(template: string, parentElementId: string) {
  const parentElement = document.getElementById(parentElementId);
  parentElement?.insertAdjacentHTML('beforeend', template);
}

export function elementByIdExists(elementId: string): boolean {
  if (document.getElementById(elementId)) {
    return true;
  } else {
    return false;
  }
}

export function elementFromHTMLString(HTMLString: string): Element {
  const template = document.createElement('template');
  template.innerHTML = HTMLString;
  return template.content.cloneNode(true) as Element;
}
