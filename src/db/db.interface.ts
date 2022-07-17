import { Artists } from '../artists/artists.interface';
import { User } from '../users/users.interface';

export class DbInterface {
  public artistsList: Artists[];
  public usersList: User[];
}
