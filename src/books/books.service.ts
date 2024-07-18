import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import {Repository} from 'typeorm'
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BooksService{
  constructor(@InjectRepository(Book) private repo:Repository<Book>){}

  async create(bookDto: CreateBookDto){
    const book = this.repo.create(bookDto)
    return  this.repo.save(book)
  }

  // findOne(){}
  // update(){}
  // remove(){}
}
