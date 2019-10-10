import * as Either from '@shared/types/either';
import { UserRepository } from '@modules/users/4-frameworks-and-drivers/repositories/userRepository';
import { User } from '@modules/users/1-domain-and-entities/user';

export const ListUsersUseCase = (userRepository: UserRepository) => async (): Promise<
  Either.Either<Error, User[]>
> => {
  try {
    const users = await userRepository.getAllUsers();
    return Either.makeRight(users);
  } catch (err) {
    return Either.makeLeft(err);
  }
};
