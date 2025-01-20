import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Author } from "../entities/author.entity";
import { BookModule } from "./book.module";
import { AuthorController } from "../controllers/author.controller";
import { AuthorService } from "../services/author.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Author]),
        BookModule  
    ],
    controllers: [AuthorController],
    providers: [AuthorService],
    exports: [AuthorService]
})
export class AuthorModule {}