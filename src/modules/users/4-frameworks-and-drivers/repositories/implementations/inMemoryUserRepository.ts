import { User } from '@modules/users/1-domain-and-entities/user';
import {
  userToPersistence,
  userToDomain,
} from '@modules/users/3-controllers-and-interface-adapters/UserMapper';
import { userEmailToString } from '@modules/users/1-domain-and-entities/userEmail';
import {
  UserRepository,
  RawUser,
} from '@modules/users/4-frameworks-and-drivers/repositories/userRepository';

const users: RawUser[] = [];

export const inMemoryUserRepository: UserRepository = {
  async existsByEmail(email): Promise<boolean> {
    const emailStr = userEmailToString(email);
    return users.some(u => u.email === emailStr);
  },

  async save(user): Promise<void> {
    const userToSave = userToPersistence(user);
    users.push(userToSave);
  },

  async getAllUsers(): Promise<User[]> {
    return users.map(userToDomain);
  },
};
