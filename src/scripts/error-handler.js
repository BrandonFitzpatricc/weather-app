const handleError = async (loadFn, handleErrorFn) => {
  try {
    await loadFn();
  } catch {
    handleErrorFn();
  }
};

export { handleError };
