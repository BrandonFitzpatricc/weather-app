// toggleStatus is a parameter to strictly toggle the loader to be visible or not.
const toggleLoader = (selector, toggleStatus) => {
  const loader = document.querySelector(selector);
  loader.className = toggleStatus === "visible" ? "loader" : "loader hidden";
};

export { toggleLoader };
