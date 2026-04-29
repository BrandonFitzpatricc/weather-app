const handleLoadError = async (loadFn, handleErrorFn) => {
  try {
    await loadFn();
  } catch {
    handleErrorFn();
  }
};

const handleFetchError = async (fetchFn, url, handleErrorFn) => {
  try {
    return await fetchFn(url);
  } catch (error) {
    handleErrorFn(error);
  }
};

const handleFormSubmissionError = async (submitFn, event, handleErrorFn) => {
  try {
    await submitFn(event);
  } catch {
    handleErrorFn();
  }
}

export { handleLoadError, handleFetchError, handleFormSubmissionError };
