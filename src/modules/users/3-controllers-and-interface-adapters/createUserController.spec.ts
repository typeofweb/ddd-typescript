import { CreateUserController } from './createUserController';
import * as Either from '@shared/types/either';
import { EmailAlreadyExistsError } from '@modules/users/2-use-cases/createUser/createUserErrors';
import { stringToUserEmail } from '../1-domain-and-entities/userEmail';

describe('CreateUserController', () => {
  const mockCreateUserUseCase = jest.fn().mockResolvedValue(Either.makeRight(null));
  const createUserController = CreateUserController(mockCreateUserUseCase);

  it('should pass email to create user', async () => {
    const mockRequest = { body: { email: 'test@email.xyza' } };
    await createUserController(mockRequest);
    expect(mockCreateUserUseCase).toHaveBeenCalledWith({ email: 'test@email.xyza' });
  });

  it('should error if user exists', async () => {
    const mockRequest = { body: { email: 'test@email.xyza' } };
    const email = stringToUserEmail('test@email.xyza');
    Either.assertIsRight(email);
    const error = new EmailAlreadyExistsError(email.value);
    mockCreateUserUseCase.mockResolvedValue(Either.makeLeft(error));
    await expect(createUserController(mockRequest)).rejects.toMatchObject({
      message: 'User with email test@email.xyza already exists!',
      status: 409,
    });
  });

  it('should error if something goes wrong', async () => {
    const mockRequest = { body: { email: 'test@email.xyza' } };
    const error = new Error();
    mockCreateUserUseCase.mockResolvedValue(Either.makeLeft(error));
    await expect(createUserController(mockRequest)).rejects.toHaveProperty('message', '');
  });

  it(`should error if there's an exception`, async () => {
    const mockRequest = { body: { email: 'test@email.xyza' } };
    mockCreateUserUseCase.mockRejectedValue(new Error('Errorrr'));
    await expect(createUserController(mockRequest)).rejects.toHaveProperty('message', 'Errorrr');
  });
});
