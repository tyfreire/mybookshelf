import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
