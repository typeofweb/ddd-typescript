import { stringToUserEmail, userEmailToString } from './userEmail';
import { assertIsRight, isLeft, isRight } from '@shared/types/either';

describe('UserEmail', () => {
  describe('stringToUserEmail', () => {
    it('should return Either.left if email is invalid', () => {
      const invalidEmail = stringToUserEmail('invalid email');
      expect(isLeft(invalidEmail)).toBe(true);
    });

    it('should return Either.right if email is valid', () => {
      const validEmail = stringToUserEmail('michal.miszczyszyn@miszczyszyn.michal.com');
      expect(isRight(validEmail)).toBe(true);
    });
  });

  describe('userEmailToString', () => {
    it('should return string from UserEmail', () => {
      const validEmail = stringToUserEmail('michal@miszczyszyn.com');
      assertIsRight(validEmail);

      expect(userEmailToString(validEmail.value)).toBe('michal@miszczyszyn.com');
    });
  });
});
