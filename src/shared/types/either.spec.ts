import * as Either from './either';

describe('either', () => {
  it('left is left', () => {
    expect(Either.isLeft(Either.makeLeft(null))).toBe(true);
  });

  it('right is right', () => {
    expect(Either.isRight(Either.makeRight(null))).toBe(true);
  });

  it('right is not left', () => {
    expect(Either.isLeft(Either.makeRight(null))).toBe(false);
  });

  it('left is not right', () => {
    expect(Either.isRight(Either.makeLeft(null))).toBe(false);
  });
});
