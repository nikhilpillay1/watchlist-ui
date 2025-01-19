import {User} from './user';

export interface Movie {
  name: string,
  genres: string[],
  isSeries: boolean,
  subtitles?: string[],
  submittedBy: User,
}
