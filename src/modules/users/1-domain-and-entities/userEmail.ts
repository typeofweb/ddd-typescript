/**
 * Example of a Value Object implementation in TypeScript
 * with use of nominal (opaque) types
 */
import { branded } from '@shared/types/opaqueType';
import { Either, makeRight, makeLeft } from '@shared/types/either';
import { isValidEmail } from '@shared/textUtils/validators';

export class UserEmail extends branded<string, 'UserEmail'>() {}

export function stringToUserEmail(email: string): Either<Error, UserEmail> {
  if (!isValidEmail(email)) {
    return makeLeft(new Error('Invalid email address!'));
  }
  return makeRight(UserEmail.toBranded(email));
}

export function userEmailToString(email: UserEmail): string {
  return UserEmail.fromBranded(email);
}
