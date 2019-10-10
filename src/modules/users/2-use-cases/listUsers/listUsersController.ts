import { ListUsersUseCase } from "./listUsersUseCase";
import { ListUsersResponseDTO } from "./listUsersDTOs";
import * as BaseController from "@shared/4-frameworks-and-drivers/BaseController";
import * as Either from "@shared/types/either";
import { userToDto } from "@modules/users/3-interface-adapters/UserMapper";

export const ListUsersController = (
  listUsersUseCase: ReturnType<typeof ListUsersUseCase>
): BaseController.BaseController<ListUsersResponseDTO> => async _req => {
  const result = await listUsersUseCase();

  if (Either.isLeft(result)) {
    return BaseController.internal();
  }

  const usersDto = { data: result.value.map(userToDto) };
  return BaseController.ok(usersDto);
};
