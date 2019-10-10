import * as DomainEvents from '@shared/1-domain-and-entities/DomainEvents';
import { UserCreatedEvent } from './userEvents';
import { createUser, User } from './user';
import * as UserEmail from './userEmail';
import * as UserRole from './userRole';
import * as Either from '@shared/types/either';

describe('User', () => {
  describe('createUser', () => {
    it('should dispatch event when creating user', () => {
      const mock = jest.fn();
      DomainEvents.listenToEvent<UserCreatedEvent>('USER_CREATED', mock);

      const email = UserEmail.stringToUserEmail('michal.miszczyszyn@gmail.com');
      Either.assertIsRight(email);
      const role = UserRole.stringToUserRole('admin');
      Either.assertIsRight(role);

      const user = createUser({
        email: email.value,
        role: role.value,
      });

      DomainEvents.dispatchEventsForAggregate(User);

      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith('USER_CREATED', user.value);
    });
  });
});
