import { ListUsersUseCase } from './listUsersUseCase';
import * as Either from '@shared/types/either';

describe('ListUsersUseCase', () => {
  afterEach(() => jest.resetAllMocks());

  const mockUserRepository = {
    existsByEmail: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockResolvedValue(void 0),
    getAllUsers: jest.fn(),
  };

  const listUsersUseCase = ListUsersUseCase(mockUserRepository);

  it('should return empty users', async () => {
    mockUserRepository.getAllUsers.mockResolvedValue([]);
    const result = await listUsersUseCase();

    expect(Either.isRight(result)).toBe(true);
    expect(result.value).toEqual([]);
  });

  it('should return all users', async () => {
    mockUserRepository.getAllUsers.mockResolvedValue([{}, {}, {}]);
    const result = await listUsersUseCase();

    expect(Either.isRight(result)).toBe(true);
    expect(result.value).toEqual([{}, {}, {}]);
  });

  it('should return error when repository throws', async () => {
    mockUserRepository.getAllUsers.mockRejectedValue('Errorrrrr');
    const result = await listUsersUseCase();

    expect(Either.isLeft(result)).toBe(true);
  });
});
