import { ListUsersUseCase } from '../2-use-cases/listUsers/listUsersUseCase';
import { ListUsersResponseDTO } from '../2-use-cases/listUsers/listUsersDTOs';
import * as BaseController from '@shared/3-controllers-and-interface-adapters/BaseController';
import * as Either from '@shared/types/either';
import { userToDto } from '@modules/users/3-controllers-and-interface-adapters/UserMapper';

export const ListUsersController = (
  listUsersUseCase: ReturnType<typeof ListUsersUseCase>,
): BaseController.BaseController<ListUsersResponseDTO> => async _req => {
  const result = await listUsersUseCase();

  if (Either.isLeft(result)) {
    return BaseController.internal();
  }

  const usersDto = { data: result.value.map(userToDto) };
  return BaseController.ok(usersDto);
};
