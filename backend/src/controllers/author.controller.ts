import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Author } from "src/entities/author.entity";
import { Book } from "src/entities/book.entity";
import { AuthorService } from "src/services/author.service";




@Controller('authors')
export class AuthorController{
    constructor (private readonly authorService: AuthorService){}

    @Get()
    findAll(): Promise<Author[]>{
        return this.authorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Author>{
        return this.authorService.findOne(+id);   
    }

    @Get(':id/livros')
    async findBooksByAuthorId(@Param('id') id: string): Promise<Book[]>{
        return this.authorService.findBooksByAuthorId(+id);
    }

    @Post()
    create(@Body() author: Partial<Author>): Promise<Author>{
        return this.authorService.create(author);
    }
    
    @Put(':id')
    update(@Param(':id') id: string, @Body() author: Partial<Author>): Promise<Author>{
        return this.authorService.update(+id, author);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void>{
        return this.authorService.delete(+id);
    }
}