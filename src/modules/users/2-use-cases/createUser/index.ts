import { CreateUserController } from "./createUserController";
import { CreateUserUseCase } from "./createUserUseCase";
import { inMemoryUserRepository } from "@modules/users/4-frameworks-and-drivers/repositories/implementations/inMemoryUserRepository";

const userUseCase = CreateUserUseCase(inMemoryUserRepository);
export const createUserController = CreateUserController(userUseCase);
