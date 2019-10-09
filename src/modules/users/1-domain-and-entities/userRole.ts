/**
 * Example of a Value Object implementation in TypeScript
 * with use of nominal (opaque) types
 */
import { branded } from "@shared/types/opaqueType";
import { Either, makeRight, makeLeft } from "@shared/types/either";

export class UserRole extends branded<string, 'UserRole'>() {}

function isValidUserRole(value: string) {
  return ['admin', 'user'].includes(value);
}

export function stringToUserRole(value: string): Either<Error, UserRole> {
  if (!isValidUserRole(value)) {
    return makeLeft(new Error('Invalid user role!'))
  }
  return makeRight(UserRole.toBranded(value))
}

export function UserRoleToString(role: UserRole): string {
  return UserRole.fromBranded(role);
}

