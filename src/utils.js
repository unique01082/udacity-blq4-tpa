const isToday = (someDate) => {
  const today = new Date();

  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

const dateDiff = (firstDate = new Date(), secondDate = new Date()) =>
  Math.ceil(Math.abs(firstDate - secondDate) / (1000 * 60 * 60 * 24));

module.exports = {
  isToday,
  dateDiff,
};
