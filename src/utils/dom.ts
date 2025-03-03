function getElementHeightWithMargins(element: HTMLElement) {
  const height = element.offsetHeight;

  const nodeStyle = window.getComputedStyle(element);
  const mt = parseInt(
    nodeStyle.getPropertyValue("margin-top").replace("px", "")
  );
  const mb = parseInt(nodeStyle.getPropertyValue("margin-bottom"));

  return height + mt + mb;
}

function getElementWidthWithMargins(element: HTMLElement) {
  const height = element.offsetWidth;
  const nodeStyle = window.getComputedStyle(element);
  const ml = parseInt(
    nodeStyle.getPropertyValue("margin-left").replace("px", "")
  );
  const mr = parseInt(
    nodeStyle.getPropertyValue("margin-right").replace("px", "")
  );

  return height + ml + mr;
}

export { getElementHeightWithMargins, getElementWidthWithMargins };
