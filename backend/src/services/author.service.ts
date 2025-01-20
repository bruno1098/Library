
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Author } from "../entities/author.entity";
import { BookService } from "./book.service";
import { Book } from "src/entities/book.entity";

@Injectable()

export class AuthorService {
    constructor(
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
        private bookService: BookService
    ){}

    findAll(): Promise<Author[]>{
        return this.authorRepository.find({relations: ['books']});
    }

    findOne(id: number): Promise<Author>{

        return this.authorRepository.findOne({
        where: {id},
        relations: ['books']
        });

    }

    create(author: Partial<Author>): Promise<Author>{
        return this.authorRepository.save(author);
    }

    async update(id: number, author: Partial<Author>): Promise<Author>{
        await this.authorRepository.update(id, author);
        const updatedAuthor = await this.findOne(id);

        if (author.books){

            for (const book of author.books){
                await this.bookService.update(book.id, book);
            }
        }

        return updatedAuthor;

    }

    async delete(id: number): Promise<void>{
        await this.authorRepository.delete(id);
    }


    async findBooksByAuthorId(id:number): Promise<Book[]>{
        const author = await this.authorRepository.findOne({
            where: {id},
            relations: ['books'],
        });

        return author ? author.books : [];
    }
    
}