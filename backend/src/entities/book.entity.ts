import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

import {Author} from './author.entity';

@Entity()

export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    publicationDate: Date;

    @ManyToOne(() => Author, author => author.books)
    author: Author;
}