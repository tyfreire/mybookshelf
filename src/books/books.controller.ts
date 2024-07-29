import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  async createBook(@Body() body: CreateBookDto) {
    const book = await this.bookService.create(body);
    return book;
  }

  @Get()
  async findAll() {
    const allbooks = await this.bookService.findAll();
    return allbooks;
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    const book = await this.bookService.findOne(id);
    return book;
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() body: CreateBookDto) {
    const book = await this.bookService.update(id, body);
    return book;
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    await this.bookService.remove(id);
    return 'The book has been deleted.';
  }
}
