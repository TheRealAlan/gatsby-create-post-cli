const { slugify, validateInput } = require('../utils');

describe('utils.js', () => {
  test('slugify - standard', () => {
    const title = 'Hello World';
    const slugifiedTitle = 'hello-world';

    expect(slugify(title)).toBe(slugifiedTitle);
  });

  test('slufigy - malicious', () => {
    const title = '@Hello!! World///';
    const slugifiedTitle = 'hello-world';

    expect(slugify(title)).toBe(slugifiedTitle);
  });

  test('valvalidateInput - valid', () => {
    const input = 'Hello World';

    expect(validateInput(input)).toBe(true);
  });

  test('valvalidateInput - invalid', () => {
    const input = { not: 'a string' };

    expect(validateInput(input)).toBe(false);
  });
});
