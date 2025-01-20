import { Injectable } from "@nestjs/common";
import {Book} from '../entities/book.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ){}

    findAll(): Promise<Book[]>{
        return this.bookRepository.find({
            relations: ['author']
        })
    }

    findOne(id: number): Promise<Book>{
        return this.bookRepository.findOne({
            where: {id},
            relations: ['author']
        });
    }

    create(book: Partial<Book>): Promise<Book>{
        return this.bookRepository.save(book);
    }

    async update(id: number, book: Partial<Book>): Promise<Book> {
        const existingBook = await this.findOne(id);
        if (!existingBook) {
            throw new Error('Livro não encontrado');
        }

       
        if (!book.author && existingBook.author) {
            book.author = existingBook.author;
        }

        const updatedBook = {
            ...existingBook,
            ...book,
        };

        await this.bookRepository.save(updatedBook);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        const book = await this.findOne(id);
        if (!book) {
            throw new Error('Livro não encontrado');
        }

        try {
            await this.bookRepository.delete(id);
        } catch (error) {
            throw new Error(`Erro ao excluir livro: ${error.message}`);
        }
    }

}

