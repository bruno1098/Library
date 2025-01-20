import { Author } from './author.model';

export interface Book {
  id: number;
  title: string;
  publicationDate: Date;
  author: Author;
}