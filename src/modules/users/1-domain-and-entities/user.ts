import { UserEmail } from "./userEmail";
import { UserRole } from "./userRole";
import * as Either from "@shared/types/either";
import * as AggregateRoot from "@shared/1-domain-and-entities/aggregateRoot";
import { UserCreatedEvent } from "./userEvents";

type UserProps = {
  email: UserEmail;
  role: UserRole;
};

export class User implements UserProps {
  constructor(
    public readonly email: UserEmail,
    public readonly role: UserRole
  ) {}
}

export function createUser(props: UserProps): Either.Either<Error, User> {
  if (!props.email) {
    return Either.makeLeft(new Error("Missing email!"));
  }

  if (!props.role) {
    return Either.makeLeft(new Error("Missing role!"));
  }

  const user = new User(props.email, props.role);

  const event: UserCreatedEvent = {
    type: "USER_CREATED",
    value: user
  };
  AggregateRoot.addDomainEvent(event);

  return Either.makeRight(user);
}
