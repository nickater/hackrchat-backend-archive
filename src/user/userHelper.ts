import { User } from './entities/user.entity';

export const removePassword = (user: User): User => {
  delete user.password;
  return user;
};
