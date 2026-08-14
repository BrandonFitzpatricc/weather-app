import { Attribute } from "./attribute";

const createElement = (type, className, ...attributes) => {
  const element = document.createElement(type);
  element.className = className;
  attributes.forEach((attribute) => {
    element.setAttribute(attribute.name, attribute.value);
  });
  return element;
};

const createTextElement = (type, className, textContent, ...attributes) => {
  const element = document.createElement(type);
  element.className = className;
  element.textContent = textContent;
  attributes.forEach((attribute) => {
    element.setAttribute(attribute.name, attribute.value);
  });
  return element;
};

const createIconBtn = (className, src, alt, dimensions) => {
  const btn = createElement("button", className);
  btn.appendChild(createIcon("icon", src, alt, dimensions));
  return btn;
};

const createIcon = (className, src, alt, dimensions) => {
  return createElement(
    "img",
    className,
    new Attribute("src", src),
    new Attribute("alt", alt),
    new Attribute("width", dimensions),
    new Attribute("height", dimensions),
  );
};

export { createElement, createTextElement, createIconBtn, createIcon };
