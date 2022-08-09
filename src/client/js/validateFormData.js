function validateFormData({ place, from, to }) {
  if (!place || !from || !to) {
    throw "Fields are required";
  }

  if (from > to) {
    throw "To date should be after from date";
  }
}

export { validateFormData };
