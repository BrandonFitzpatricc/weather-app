const handleStartupError = async (handleInfoFn, handleErrorFn) => {
  try {
    await handleInfoFn();
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

export { handleStartupError, handleFetchError, handleFormSubmissionError };
