import { ListUsersController } from '@modules/users/3-controllers-and-interface-adapters/listUsersController';
import { ListUsersUseCase } from './listUsersUseCase';
import { inMemoryUserRepository } from '@modules/users/4-frameworks-and-drivers/repositories/implementations/inMemoryUserRepository';

const listUsersUseCase = ListUsersUseCase(inMemoryUserRepository);
export const listUsersController = ListUsersController(listUsersUseCase);
