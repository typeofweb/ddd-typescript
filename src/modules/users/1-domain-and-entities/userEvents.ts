import { User } from './user';

export type UserCreatedEvent = {
  type: 'USER_CREATED';
  value: User;
};
