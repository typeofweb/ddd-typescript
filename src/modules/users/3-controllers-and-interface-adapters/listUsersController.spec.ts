import { ListUsersController } from './listUsersController';
import * as Either from '@shared/types/either';

describe('ListUsersController', () => {
  const mockListUsersUseCase = jest.fn().mockResolvedValue(Either.makeRight([]));
  const listUsersController = ListUsersController(mockListUsersUseCase);
  const mockRequest = { body: undefined };

  it('should return users', async () => {
    mockListUsersUseCase.mockResolvedValue(
      Either.makeRight([
        { email: 'test1@email.com', roleId: 'user' },
        { email: 'test2@email.com', roleId: 'admin' },
      ]),
    );
    const result = await listUsersController(mockRequest);
    expect(mockListUsersUseCase).toHaveBeenCalled();
    expect(result).toEqual({
      body: {
        data: [
          { email: 'test1@email.com', role: undefined },
          { email: 'test2@email.com', role: undefined },
        ],
      },
      status: 200,
    });
  });

  it('should error if something goes wrong', async () => {
    const error = new Error();
    mockListUsersUseCase.mockResolvedValue(Either.makeLeft(error));
    await expect(listUsersController(mockRequest)).rejects.toHaveProperty('message', '');
  });

  it(`should error if there's an exception`, async () => {
    mockListUsersUseCase.mockRejectedValue(new Error('Errorrr'));
    await expect(listUsersController(mockRequest)).rejects.toHaveProperty('message', 'Errorrr');
  });
});
