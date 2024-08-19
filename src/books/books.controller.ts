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
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  async createBook(@Body() body: CreateBookDto): Promise<Book> {
    const book: Book = await this.bookService.create(body);
    return book;
  }

  @Get()
  async findAll(): Promise<Book[]> {
    const allbooks: Book[] = await this.bookService.findAll();
    return allbooks;
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<Book> {
    const book: Book = await this.bookService.findOne(id);
    return book;
  }

  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() body: CreateBookDto,
  ): Promise<Book> {
    const book: Book = await this.bookService.update(id, body);
    return book;
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.bookService.remove(id);
    return { message: 'The book has been deleted.' };
  }
}
