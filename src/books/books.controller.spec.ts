import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';


describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBookRepository ={
    create: jest.fn().mockImplementation(dto =>dto),
    save: jest.fn().mockImplementation(book => Promise.resolve({id: Math.random(), ...book}))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers:[{
        provide: BooksService,
        useValue: mockBookRepository
      },
      { provide: APP_PIPE,
        useClass: ValidationPipe,

    }]
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService)
  });

   afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async() => {
    expect(controller).toBeDefined();
  });

})
