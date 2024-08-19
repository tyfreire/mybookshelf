import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

  create(bookDto: CreateBookDto) {
    const book = this.repo.create(bookDto);
    return this.repo.save(book);
  }

  async findAll(): Promise<Book[]> {
    const allbooks: Book[] = await this.repo.find();

    return allbooks;
  }
  async findOne(id: number): Promise<Book> {
    const book: Book = await this.repo.findOne({ where: { id: id } });
    return book;
  }

  async update(id: number, attrs: Partial<Book>): Promise<Book> {
    let book: Book = await this.repo.findOne({ where: { id: id } });

    book = Object.assign(book, attrs);
    return this.repo.save(book);
  }

  async remove(id: number): Promise<void> {
    const book: Book = await this.repo.findOne({ where: { id: id } });

    if (!book) {
      throw new NotFoundException(`Book not found`);
    } else {
      await this.repo.remove(book);
    }
  }
}
