import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Author } from "../entities/author.entity";
import { BookModule } from "./book.module";


@Module({
    imports:[
        TypeOrmModule.forFeature([Author]),
        BookModule,
    ]


})

export class AuthorModule {}