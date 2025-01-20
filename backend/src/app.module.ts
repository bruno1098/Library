import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RpaService } from './utils/rpa.service';
import { ChatGateway } from './gateway/chat.gateway';
import { AuthorModule } from './modules/author.module';
import { BookModule } from './modules/book.module';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'library.sqlite',
      entities: [Author, Book],
      synchronize: true,
    }),
    AuthorModule,
    BookModule,
    ChatGateway,
  ],
})
export class AppModule {}
