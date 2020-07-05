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
  it('Должно добавлять 1 день', () => {
    expect(addDays(new Date(2020, 0, 1), 1)).to.equalDate(new Date(2020, 0, 2));
  });

  it('Должно добавлять 1 час', () => {
    expect(addHours(new Date(2020, 0, 1), 1)).to.equalDate(new Date(2020, 0, 1, 2));
  });
});

describe('Вычитание', () => {
  it('Должно вычитать 1 день', () => {
    expect(subtractDays(new Date(2020, 0, 1), 1)).to.equalDate(new Date(2019, 11, 31));
  });

  it('Должно вычитать 1 час', () => {
    expect(subtractHours(new Date(2020, 0, 1), 1)).to.equalDate(new Date(2019, 11, 31, 23));
  });
});
