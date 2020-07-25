module.exports = {
  addDays,
  subtractDays,
  addHours,
  subtractHours,
};

function addDays(date, quantity) {
  date.setDate(date.getDate() + quantity);
  return date;
}

function subtractDays(date, quantity) {
  date.setDate(date.getDate() - quantity);
  return date;
}

function addHours(date, quantity) {
  date.setHours(date.getHours() + quantity);
  return date;
}

function subtractHours(date, quantity) {
  date.setHours(date.getHours() - quantity);

  return date;
}
