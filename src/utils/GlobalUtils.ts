type anchoringPosition = 'left' | 'right' | 'top' | 'bottom';
type HTMLInsertPosition = 'afterbegin' | 'afterend' | 'beforebegin' | 'beforeend';

export function insertHTMLInsideElementById(
  template: string,
  parentElementId: string,
  position: HTMLInsertPosition = 'beforeend'
) {
  const parentElement = document.getElementById(parentElementId);
  parentElement?.insertAdjacentHTML(position, template);
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

export function getGlobalPositionById(elementId: string) {
  const element = document.getElementById(elementId) as Element;
  var rect = element.getBoundingClientRect();
  const x = rect.left;
  const y = rect.top;
  // Return the position object
  return { x: x, y: y };
}

export function getGlobalPositionWithScrollOffsetById(elementId: string): { x: number; y: number } {
  const element = document.getElementById(elementId) as Element;
  var rect = element.getBoundingClientRect();
  // Add the scroll offset
  let x = rect.left + window.scrollX;
  let y = rect.top + window.scrollY;
  return { x: x, y: y };
}

export function anchorToElementById(
  parentId: string,
  childId: string,
  anchorPosition: anchoringPosition
) {
  const childElement = document.getElementById(childId) as HTMLElement;
  window.addEventListener('resize', () => {
    const parentPosition = getGlobalPositionById(parentId);
    if (anchorPosition === 'left') {
      childElement.style.left = Math.round(parentPosition.x - 20).toString() + 'px';
    }
  });
}
