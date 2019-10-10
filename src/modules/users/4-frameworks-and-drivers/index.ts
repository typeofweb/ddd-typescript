import { inMemoryUserRepository } from '@modules/users/4-frameworks-and-drivers/repositories/implementations/inMemoryUserRepository';
import { CreateUserController } from '@modules/users/3-controllers-and-interface-adapters/createUserController';
import { CreateUserUseCase } from '@modules/users/2-use-cases/createUser/createUserUseCase';
import { ListUsersController } from '@modules/users/3-controllers-and-interface-adapters/listUsersController';
import { ListUsersUseCase } from '@modules/users/2-use-cases/listUsers/listUsersUseCase';

const createUserUseCase = CreateUserUseCase(inMemoryUserRepository);
export const createUserController = CreateUserController(createUserUseCase);

const listUsersUseCase = ListUsersUseCase(inMemoryUserRepository);
export const listUsersController = ListUsersController(listUsersUseCase);
