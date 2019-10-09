import { CreateUserUseCase } from './createUserUseCase'
import { CreateUserResponseDTO, CreateUserRequestDTO } from './createUserDTOs';
import * as Either from '../../../../shared/types/either';
import * as BaseController from '@shared/4-frameworks-and-drivers/BaseController';
import { EmailAlreadyExistsError } from './createUserErrors';

export const CreateUserController = (createUserUseCase: ReturnType<typeof CreateUserUseCase>): BaseController.BaseController => async (req) => {
  const dto: CreateUserRequestDTO = req.body;

  const result = await createUserUseCase({
    email: dto.email,
  })

  if (Either.isLeft(result)) {
    if (result.value instanceof EmailAlreadyExistsError) {
      return BaseController.conflict(result.value.message);
    } else {
      return BaseController.internal();
    }
  }
  
  return BaseController.ok(result.value);
}
