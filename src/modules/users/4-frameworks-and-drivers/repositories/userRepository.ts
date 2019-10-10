import { UserEmail } from "@modules/users/1-domain-and-entities/userEmail";
import { User } from "@modules/users/1-domain-and-entities/user";

export type RawUser = {
  email: string;
  roleId: string;
};

export interface UserRepository {
  existsByEmail(email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
  getAllUsers(): Promise<User[]>;
}
