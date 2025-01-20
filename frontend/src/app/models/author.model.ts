export interface Author {
    id: number;
    name: string;
    birthDate: Date;
    books: {
      id: number;
      title: string;
      publicationDate: Date;
    }[];
  }