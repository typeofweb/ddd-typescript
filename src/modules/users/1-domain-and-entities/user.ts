import { UserEmail } from './userEmail';
import { UserRole } from './userRole';
import * as Either from '@shared/types/either';
import * as DomainEvents from '@shared/1-domain-and-entities/DomainEvents';
import { UserCreatedEvent } from './userEvents';

export type UserProps = {
  email: UserEmail;
  role: UserRole;
};

export class User implements UserProps {
  constructor(public readonly email: UserEmail, public readonly role: UserRole) {}
}

export function createUser(props: UserProps): Either.Either<Error, User> {
  const user = new User(props.email, props.role);

  DomainEvents.addDomainEvent<UserCreatedEvent>(User, 'USER_CREATED', user);

  return Either.makeRight(user);
}
