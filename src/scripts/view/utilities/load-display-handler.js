const showLoader = (selector) => {
  const loader = document.querySelector(selector);
  loader.className = "loader";
};

const hideLoader = (selector) => {
  const loader = document.querySelector(selector);
  loader.className = "loader hidden";
};

export { showLoader, hideLoader };
