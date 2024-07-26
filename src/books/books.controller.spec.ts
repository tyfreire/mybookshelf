import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBookRepository = {
    create: jest
      .fn()
      .mockImplementation((book) =>
        Promise.resolve({ id: Math.random(), ...book }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBookRepository,
        },
        { provide: APP_PIPE, useClass: ValidationPipe },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('persists a book in the db and return 201', async () => {
    const bookDto: CreateBookDto = {
      title: 'Book1',
      author: 'Myself',
      pages: 150,
      language: 'ENGLISH',
      status: 'READ',
      isbn: 1212354465,
    };

    let book = await controller.createBook(bookDto);

    expect(book.id).toBeGreaterThan(0);
    expect(book.author).toEqual('Myself');
    expect(book.language).toEqual('ENGLISH');
    expect(book.pages).toEqual(150);
    expect(book.isbn).toEqual(1212354465);
    expect(book.status).toEqual('READ');
  });
});
