import { stringToUserRole, userRoleToString } from './userRole';
import { isLeft, isRight, assertIsRight } from '@shared/types/either';

describe('UserRole', () => {
  describe('stringToUserRole', () => {
    it('should return Either.left if role is invalid', () => {
      const invalidRole = stringToUserRole('invalid role');
      expect(isLeft(invalidRole)).toBe(true);
    });

    it('should return Either.right if role is valid', () => {
      const validRole = stringToUserRole('admin');
      expect(isRight(validRole)).toBe(true);
    });
  });

  describe('userRoleToString', () => {
    it('should return string from UserRole', () => {
      const validRole = stringToUserRole('user');
      assertIsRight(validRole);

      expect(userRoleToString(validRole.value)).toBe('user');
    });
  });
});
