import {Genre} from './genre';
import {MovieSubtitle} from './movie-subtitle';

export interface Movie {
  name: string,
  genres: Genre[],
  isSeries: boolean,
  subtitles?: MovieSubtitle[],
  submitter: string,
}
