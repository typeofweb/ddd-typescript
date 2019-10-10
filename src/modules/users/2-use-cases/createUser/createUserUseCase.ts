import { createUser } from '@modules/users/1-domain-and-entities/user';
import { stringToUserEmail } from '@modules/users/1-domain-and-entities/userEmail';
import { stringToUserRole } from '@modules/users/1-domain-and-entities/userRole';
import * as Either from '@shared/types/either';
import { EmailAlreadyExistsError } from './createUserErrors';
import { CreateUserRequestDTO, CreateUserResponseDTO } from './createUserDTOs';
import { UserRepository } from '@modules/users/4-frameworks-and-drivers/repositories/userRepository';

export const CreateUserUseCase = (userRepository: UserRepository) => async (
  request: CreateUserRequestDTO,
): Promise<Either.Either<Error, CreateUserResponseDTO>> => {
  try {
    const emailOrError = stringToUserEmail(request.email);
    const roleOrError = stringToUserRole('user');

    if (Either.isLeft(emailOrError)) {
      return emailOrError;
    }

    if (Either.isLeft(roleOrError)) {
      return roleOrError;
    }

    const userExists = await userRepository.existsByEmail(emailOrError.value);

    if (userExists) {
      return Either.makeLeft(new EmailAlreadyExistsError(emailOrError.value));
    }

    const userOrError = createUser({
      email: emailOrError.value,
      role: roleOrError.value,
    });

    if (Either.isLeft(userOrError)) {
      return userOrError;
    }

    await userRepository.save(userOrError.value);
    return Either.makeRight(null);
  } catch (err) {
    return Either.makeLeft(err);
  }
};
