import { User, createUser } from "../../1-domain-and-entities/user";
import {
  stringToUserEmail,
  UserEmail
} from "../../1-domain-and-entities/userEmail";
import { stringToUserRole } from "../../1-domain-and-entities/userRole";
import * as Either from "@shared/types/either";
import { EmailAlreadyExistsError } from "./createUserErrors";
import { isLeft } from '../../../../shared/types/either';
import { CreateUserRequestDTO, CreateUserResponseDTO } from "./createUserDTOs";
import { UserRepository } from '../../4-frameworks-and-drivers/repositories/userRepository';

export const CreateUserUseCase = (userRepository: UserRepository) => async (
  request: CreateUserRequestDTO
): Promise<Either.Either<Error, CreateUserResponseDTO>> => {
  const emailOrError = stringToUserEmail(request.email);
  const roleOrError = stringToUserRole("user");

  if (Either.isLeft(emailOrError)) {
    return emailOrError;
  }

  if (Either.isLeft(roleOrError)) {
    return roleOrError;
  }

  const userExists = userRepository.existsByEmail(emailOrError.value);

  if (userExists) {
    return Either.makeLeft(new EmailAlreadyExistsError(emailOrError.value));
  }

  const userOrError = createUser({
    email: emailOrError.value,
    role: roleOrError.value,
  });

  if (isLeft(userOrError)) {
    return userOrError;
  }

  await userRepository.save(userOrError.value);
  return Either.makeRight(null);
};
