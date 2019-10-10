import { CreateUserUseCase } from './createUserUseCase';
import { CreateUserRequestDTO } from './createUserDTOs';
import * as Either from '../../../../shared/types/either';

describe('CreateUserUseCase', () => {
  afterEach(() => jest.resetAllMocks());

  const mockUserRepository = {
    existsByEmail: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockResolvedValue(void 0),
    getAllUsers: jest.fn(),
  };

  const createUserUseCase = CreateUserUseCase(mockUserRepository);

  it('should not error and persist on valid input', async () => {
    const mockRequest: CreateUserRequestDTO = {
      email: 'aaa@domain.com',
    };

    const result = await createUserUseCase(mockRequest);

    expect(Either.isRight(result)).toBe(true);
    expect(mockUserRepository.save).toHaveBeenCalledWith({
      email: 'aaa@domain.com',
      role: 'user',
    });
  });

  it('should error and not persist on invalid input', async () => {
    const mockRequest: CreateUserRequestDTO = {
      email: 'aaa',
    };

    const result = await createUserUseCase(mockRequest);

    expect(Either.isLeft(result)).toBe(true);
    expect(mockUserRepository.save).not.toHaveBeenCalled();
  });

  it('should error and not persist if email exists', async () => {
    const mockRequest: CreateUserRequestDTO = {
      email: 'aaa@domain.com',
    };

    mockUserRepository.existsByEmail.mockResolvedValue(true);

    const result = await createUserUseCase(mockRequest);

    expect(Either.isLeft(result)).toBe(true);
    expect(mockUserRepository.save).not.toHaveBeenCalled();
  });

  it('should error and not persist if repository throws on save', async () => {
    const mockRequest: CreateUserRequestDTO = {
      email: 'aaa@domain.com',
    };

    mockUserRepository.save.mockRejectedValue('Errorrrrr');

    const result = await createUserUseCase(mockRequest);

    expect(Either.isLeft(result)).toBe(true);
  });

  it('should error and not persist if repository throws on existence check', async () => {
    const mockRequest: CreateUserRequestDTO = {
      email: 'aaa@domain.com',
    };

    mockUserRepository.existsByEmail.mockRejectedValue('Errorrrrr');

    const result = await createUserUseCase(mockRequest);

    expect(Either.isLeft(result)).toBe(true);
    expect(mockUserRepository.save).not.toHaveBeenCalled();
  });
});
