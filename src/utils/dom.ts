function getElementHeightWithMargins(element: HTMLElement) {
  const height = element.offsetHeight;

  const nodeStyle = window.getComputedStyle(element);
  const mt = parseInt(
    nodeStyle.getPropertyValue("margin-top").replace("px", ""),
    10
  );
  const mb = parseInt(nodeStyle.getPropertyValue("margin-bottom"), 10);

  return height + mt + mb;
}

function getElementWidthWithMargins(element: HTMLElement) {
  const height = element.offsetWidth;
  const nodeStyle = window.getComputedStyle(element);
  const ml = parseInt(
    nodeStyle.getPropertyValue("margin-left").replace("px", ""),
    10
  );
  const mr = parseInt(
    nodeStyle.getPropertyValue("margin-right").replace("px", ""),
    10
  );

  return height + ml + mr;
}

export { getElementHeightWithMargins, getElementWidthWithMargins };
