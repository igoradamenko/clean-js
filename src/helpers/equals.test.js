const chai = require('chai');
const equals = require('./equals');

const expect = chai.expect;

describe('Простые типы', () => {
  it('Должно корректно сравнивать undefined', () => {
    expect(equals(undefined, undefined)).to.equal(true);
  });

  it('Должно корректно сравнивать булевы типы', () => {
    expect(equals(true, false)).to.equal(false);
    expect(equals(true, true)).to.equal(true);
    expect(equals(false, false)).to.equal(true);
  });

  it('Должно корректно сравнивать числа', () => {
    expect(equals(0, 0)).to.equal(true);
    expect(equals(0, 1)).to.equal(false);
  });

  it('Должно корректно сравнивать строки', () => {
    expect(equals('', 'non-empty')).to.equal(false);
    expect(equals('', '')).to.equal(true);
    expect(equals('non-empty', 'non-empty')).to.equal(true);
  });

  it('Должно корректно сравнивать большие числа', () => {
    // TODO: тут теоретически можно было бы внести в хэлпер ошибку, которая бы не учитывала 0, например
    expect(equals(1n, 1n)).to.equal(true);
    expect(equals(1n, 2n)).to.equal(false);
  });

  it('Должно корректно сравнивать символы', () => {
    const symbol = Symbol('symbol');

    expect(equals(symbol, symbol)).to.equal(true);
    expect(equals(Symbol('symbol'), Symbol('symbol'))).to.equal(false);
  });

  it('Должно корректно сравнивать значения разных типов', () => {
    expect(equals(undefined, false)).to.equal(false);
    expect(equals(undefined, 0)).to.equal(false);
    expect(equals(undefined, '')).to.equal(false);
    expect(equals(undefined, 0n)).to.equal(false);
    expect(equals(undefined, Symbol(''))).to.equal(false);

    expect(equals(false, 0)).to.equal(false);
    expect(equals(false, '')).to.equal(false);
    expect(equals(false, 0n)).to.equal(false);
    expect(equals(false, Symbol(''))).to.equal(false);

    expect(equals(true, 1)).to.equal(false);
    expect(equals(true, '1')).to.equal(false);
    expect(equals(true, 1n)).to.equal(false);
    expect(equals(true, Symbol('1'))).to.equal(false);

    expect(equals(0, '')).to.equal(false);
    expect(equals(0, 0n)).to.equal(false);
    expect(equals(0, Symbol(''))).to.equal(false);

    expect(equals(1, '1')).to.equal(false);
    expect(equals(1, 1n)).to.equal(false);
    expect(equals(1, Symbol('1'))).to.equal(false);

    expect(equals('', 0n)).to.equal(false);
    expect(equals('', Symbol(''))).to.equal(false);

    expect(equals('1', 1n)).to.equal(false);
    expect(equals('1', Symbol('1'))).to.equal(false);

    expect(equals(0n, Symbol(''))).to.equal(false);

    expect(equals(1n, Symbol('1'))).to.equal(false);
  });
});

describe('null', () => {
  it('Должно корректно сравнивать null с самим собой', () => {
    expect(equals(null, null)).to.equal(true);
  });

  it('Должно корректно сравнивать null со всеми остальными примитивами', () => {
    expect(equals(null, undefined)).to.equal(false);
    expect(equals(null, false)).to.equal(false);
    expect(equals(null, 0)).to.equal(false);
    expect(equals(null, 0)).to.equal(false);
    expect(equals(null, '')).to.equal(false);
    expect(equals(null, 0n)).to.equal(false);
    expect(equals(null, Symbol(''))).to.equal(false);
  });
});

describe('Объекты', () => {
  it('Должно корректно сравнивать обычные объекты', () => {
    const obj = {};

    expect(equals(obj, obj)).to.equal(true);
    expect(equals({}, {})).to.equal(true);
    expect(equals({a: 1}, {a: 1})).to.equal(true);
    expect(equals({a: 1}, {b: 2})).to.equal(false);
  });

  it('Должно корректно сравнивать массивы', () => {
    const arr = [];

    expect(equals(arr, arr)).to.equal(true);
    expect(equals([], [])).to.equal(true);
    expect(equals([1], [1])).to.equal(true);
    expect(equals([1], [2])).to.equal(false);
  });

  it('Должно корректно сравнивать даты', () => {
    expect(equals(new Date(2000, 0, 0), new Date(2000, 0, 0))).to.equal(true);
    expect(equals(new Date(2000, 0, 0), new Date(2000, 0, 1))).to.equal(false);
  });

  it('Должно корректно сравнивать функции', () => {
    const fn = () => {};

    expect(equals(fn, fn)).to.equal(true);
    expect(equals(() => {}, () => {})).to.equal(false);
  });

  // TODO: не сравнивает мапы

  it('Должно корректно сравнивать значения разных типов', () => {
    // TODO: например, вот такое граничное условие не сработает
    // expect(equals({}, [])).to.equal(false);
    // expect(equals({}, new Date())).to.equal(false);
    // expect(equals({}, () => {})).to.equal(false);
    // expect(equals(Array, Object)).to.equal(false);
  });
});
