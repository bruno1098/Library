import { Injectable } from "@nestjs/common";
import {Book} from '../entities/book.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Author } from '../entities/author.entity';


@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(Author)
        private authorRepository: Repository<Author>
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

    async create(book: Partial<Book>): Promise<Book> {
        try {
            if (book.author && book.author.id) {
                const author = await this.authorRepository.findOne({
                    where: { id: book.author.id }
                });
                
                if (!author) {
                    throw new Error('Autor não encontrado');
                }
                
                book.author = author;
            }
        
            const newBook = this.bookRepository.create(book);
            const savedBook = await this.bookRepository.save(newBook);
           
            return this.findOne(savedBook.id);
        } catch (error) {
            throw new Error(`Erro ao criar livro: ${error.message}`);
        }
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

