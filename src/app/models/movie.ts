import {User} from './user';

export interface Movie {

  submittedBy: User;
  name: string,
  genres: string[],

}
