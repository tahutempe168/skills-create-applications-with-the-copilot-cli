const { calc } = require('../index');

describe('Calculator functions', () => {
  test('2 + 3 -> 5 (addition)', () => {
    expect(calc('add', 2, 3)).toBe(5);
  });

  test('10 - 4 -> 6 (subtraction)', () => {
    expect(calc('sub', 10, 4)).toBe(6);
  });

  test('45 * 2 -> 90 (multiplication)', () => {
    expect(calc('mul', 45, 2)).toBe(90);
  });

  test('20 / 5 -> 4 (division)', () => {
    expect(calc('div', 20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => calc('div', 5, 0)).toThrow('Division by zero');
  });

  test('invalid operands throw', () => {
    expect(() => calc('add', 'a', 2)).toThrow('Operands must be valid numbers');
  });

  test('supports operations with integer and float', () => {
    expect(calc('add', 1.5, 2.25)).toBeCloseTo(3.75);
  });
});
