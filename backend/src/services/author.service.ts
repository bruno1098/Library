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

    async create(author: Partial<Author>): Promise<Author> {
        try {
           
            if (author.books && author.books.length > 0) {
                const validatedBooks = [];
                for (const book of author.books) {
                    if (book.id) {
                        const existingBook = await this.bookService.findOne(book.id);
                        if (!existingBook) {
                            throw new Error(`Livro com ID ${book.id} não encontrado`);
                        }
                        validatedBooks.push(existingBook);
                    } else {
                       
                        validatedBooks.push(book);
                    }
                }
                author.books = validatedBooks;
            }

           
            const newAuthor = this.authorRepository.create(author);
            await this.authorRepository.save(newAuthor);
            
            
            return this.findOne(newAuthor.id);
        } catch (error) {
            throw new Error(`Erro ao criar autor: ${error.message}`);
        }
    }

    async update(id: number, author: Partial<Author>): Promise<Author> {
        const existingAuthor = await this.findOne(id);
        if (!existingAuthor) {
            throw new Error('Autor não encontrado');
        }

       
        if (!author.books) {
            author.books = existingAuthor.books;
        }

      
        const updatedAuthor = {
            ...existingAuthor,
            ...author,
        };

        await this.authorRepository.save(updatedAuthor);

       
        if (author.books) {
            for (const book of author.books) {
                await this.bookService.update(book.id, book);
            }
        }

        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        const author = await this.findOne(id);
        if (!author) {
            throw new Error('Autor não encontrado');
        }

        // Primeiro, exclui todos os livros do autor
        if (author.books) {
            for (const book of author.books) {
                await this.bookService.delete(book.id);
            }
        }

        // Depois, exclui o autor
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