import { CreateUserUseCase } from '@modules/users/2-use-cases/createUser/createUserUseCase';
import { CreateUserRequestDTO } from '@modules/users/2-use-cases/createUser/createUserDTOs';
import * as BaseController from '@shared/3-controllers-and-interface-adapters/BaseController';
import { EmailAlreadyExistsError } from '@modules/users/2-use-cases/createUser/createUserErrors';
import * as Either from '@shared/types/either';

export const CreateUserController = (
  createUserUseCase: ReturnType<typeof CreateUserUseCase>,
): BaseController.BaseController<null, CreateUserRequestDTO> => async req => {
  const dto = req.body;

  const result = await createUserUseCase({
    email: dto.email,
  });

  if (Either.isLeft(result)) {
    if (result.value instanceof EmailAlreadyExistsError) {
      return BaseController.conflict(result.value.message);
    } else {
      return BaseController.internal();
    }
  }

  return BaseController.ok(result.value);
};
