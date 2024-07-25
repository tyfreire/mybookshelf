import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';

describe('BooksService', () => {
  let bookservice: BooksService;

  const mockBookRepository ={
    create: jest.fn().mockImplementation(dto =>dto),
    save: jest.fn().mockImplementation(book => Promise.resolve({id: Math.random(), ...book}))
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, {
        provide:getRepositoryToken(Book),
        useValue: mockBookRepository
      }],
    }).compile();

    bookservice = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(bookservice).toBeDefined();
  });


  it('should persist a book in the DB and return it', async ()=>{
    const dto ={
      title: "Book1",
      author: "Myself",
      pages: 150,
      language: "ENGLISH",
      status: "READ",
      isbn: 1212354465
    }

    let book =  mockBookRepository.create(dto)
    expect(book.title).toBe("Book1")

    const book_1 = await mockBookRepository.save(book)
    expect(await book_1.author).toBe("Myself")
  })
});