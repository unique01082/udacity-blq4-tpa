function checkForUrl(inputText) {
  try {
    new URL(inputText);
    return true;
  } catch (e) {
    return false;
  }
}

export { checkForUrl };
