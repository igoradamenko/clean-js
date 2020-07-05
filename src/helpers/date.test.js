const chai = require('chai');
require('chai').use(require('chai-datetime'));

const expect = chai.expect;

const {
  addHours,
  subtractHours,
  addDays,
  subtractDays,
} = require('./date');

describe('Добавление', () => {
  it('Проверка добавления 1 дня', () => {
    expect(addDays(new Date(2020, 0, 1), 1)).to.equalDate(new Date(2020, 0, 2));
  });

  it('Проверка добавления 1 часа', () => {
    expect(addHours(new Date(2020, 0, 1), 1)).to.equalDate(new Date(2020, 0, 1, 2));
  });
});

describe('Вычитание', () => {
  it('Проверка вычитания 1 дня', () => {
    expect(subtractDays(new Date(2020, 0, 1), 1)).to.equalDate(new Date(2019, 11, 31));
  });

  it('Проверка вычитания 1 часа', () => {
    expect(subtractHours(new Date(2020, 0, 1), 1)).to.equalDate(new Date(2019, 11, 31, 23));
  });
});
