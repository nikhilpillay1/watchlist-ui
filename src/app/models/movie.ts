import {Genre} from './genre';
import {MovieSubtitle} from './movie-subtitle';

export interface Movie {
  id?: number;
  name: string,
  genres: Genre[],
  submitter: string,
}
