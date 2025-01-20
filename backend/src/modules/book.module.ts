import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "../entities/book.entity";
import { BookController } from "../controllers/book.controller";
import { BookService } from "../services/book.service";
import { Author } from '../entities/author.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Book, Author])
    ],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookService]
})
export class BookModule {}