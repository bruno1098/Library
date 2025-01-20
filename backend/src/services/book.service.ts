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

    async update(id: number, book: Partial<Book>): Promise<Book>{
        await this.bookRepository.update(id, book);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void>{
        await this.bookRepository.delete(id);
    }

}

