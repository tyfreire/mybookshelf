import { Controller, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService){}

  @Post()
  async createBook(@Body() body: CreateBookDto){
    const book = await this.bookService.create(body);
    return book;
  }
}
