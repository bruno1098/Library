

import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Book } from "src/entities/book.entity";
import { BookService } from "src/services/book.service";

@Controller('books')
export class BookController{
    constructor(private readonly bookService: BookService){}

    @Get()
    findAll(): Promise<Book[]>{
        return this.bookService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Book>{
        return this.bookService.findOne(+id);
    }

    @Post()
    create(@Body() book: Partial<Book>): Promise<Book>{
        return this.bookService.create(book);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() book: Partial<Book>): Promise<Book>{

        return this.bookService.update(+id, book);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void>{
        return this.bookService.delete(+id);
    }
}