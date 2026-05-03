const toggleLoader = (selector) => {
  const loader = document.querySelector(selector);
  loader.className = loader.className.includes("hidden")
    ? "loader"
    : "loader hidden";
};

export { toggleLoader };
