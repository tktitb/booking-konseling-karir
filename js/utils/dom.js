export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(child => {
    if (child == null) return;
    if (typeof child === "string") node.appendChild(document.createTextNode(child));
    else node.appendChild(child);
  });
  return node;
}

export function mount(root, node) {
  root.innerHTML = "";
  root.appendChild(node);
}
