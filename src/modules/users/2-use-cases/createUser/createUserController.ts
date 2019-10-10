import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserRequestDTO } from "./createUserDTOs";
import * as BaseController from "@shared/4-frameworks-and-drivers/BaseController";
import { EmailAlreadyExistsError } from "./createUserErrors";
import * as Either from "@shared/types/either";

export const CreateUserController = (
  createUserUseCase: ReturnType<typeof CreateUserUseCase>
): BaseController.BaseController<null, CreateUserRequestDTO> => async req => {
  const dto = req.body;

  const result = await createUserUseCase({
    email: dto.email
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
