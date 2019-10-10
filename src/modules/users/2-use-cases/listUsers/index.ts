import { ListUsersController } from "./listUsersController";
import { ListUsersUseCase } from "./listUsersUseCase";
import { inMemoryUserRepository } from "@modules/users/4-frameworks-and-drivers/repositories/implementations/inMemoryUserRepository";

const userUseCase = ListUsersUseCase(inMemoryUserRepository);
export const listUsersController = ListUsersController(userUseCase);
