import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus } from "@nestjs/common";
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
    async create(@Body() book: Partial<Book>): Promise<Book> {
        try {
            return await this.bookService.create(book);
        } catch (error) {
            throw new HttpException(
                error.message || 'Erro ao criar livro',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() book: Partial<Book>): Promise<Book> {
        try {
            return await this.bookService.update(+id, book);
        } catch (error) {
            throw new HttpException(
                error.message || 'Erro ao atualizar livro',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        try {
            return await this.bookService.delete(+id);
        } catch (error) {
            throw new HttpException(
                error.message || 'Erro ao excluir livro',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}