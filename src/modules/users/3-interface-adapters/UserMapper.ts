import { isLeft } from "@shared/types/either";
import { UserDTO } from "./dtos";
import { User } from "@modules/users/1-domain-and-entities/user";
import { RawUser } from "@modules/users/4-frameworks-and-drivers/repositories/userRepository";
import {
  stringToUserEmail,
  userEmailToString
} from "@modules/users/1-domain-and-entities/userEmail";
import {
  stringToUserRole,
  userRoleToString
} from "@modules/users/1-domain-and-entities/userRole";

export function userToDomain(raw: RawUser): User {
  const email = stringToUserEmail(raw.email);
  const role = stringToUserRole(raw.roleId);

  if (isLeft(email)) {
    throw new Error("Invalid user email: " + email.value);
  }

  if (isLeft(role)) {
    throw new Error("Invalid user role: " + role.value);
  }

  return {
    email: email.value,
    role: role.value
  };
}

export function userToPersistence(user: User): RawUser {
  return {
    email: userEmailToString(user.email),
    roleId: userRoleToString(user.role)
  };
}

export function userToDto(user: User): UserDTO {
  return {
    email: userEmailToString(user.email),
    role: userRoleToString(user.role)
  };
}
