import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import {Repository} from 'typeorm'
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

  create(bookDto: CreateBookDto) {
    const book = this.repo.create(bookDto);
    return this.repo.save(book);
  }

  async findAll() {
    const allbooks = await this.repo.find();
    return allbooks;
  }
  async findOne(id: number) {
    const book = await this.repo.findOne({ where: { id: id } });
    return book;
  }

  async update(id: number, attrs: Partial<Book>) {
    let book = await this.repo.findOne({ where: { id: id } });

    book = Object.assign(book, attrs);
    return this.repo.save(book);
  }

  async remove(id: number) {
    let book = await this.repo.findOne({ where: { id: id } });
    this.repo.remove(book);
  }
}
