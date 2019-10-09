import { UserEmail } from '../../1-domain-and-entities/userEmail';
import { User } from '../../1-domain-and-entities/user';

export interface UserRepository {
  existsByEmail(email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
}
