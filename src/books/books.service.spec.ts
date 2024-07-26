import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';


describe('BooksService', () => {
  let bookservice: BooksService;

  const mockBookRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((book) =>
        Promise.resolve({ id: Math.random(), ...book }),
      ),
    findAll: jest.fn().mockImplementation(() => [
      {
        title: 'The Darkest mind',
        author: 'Alexandra Braken',
        pages: 528,
        language: 'ENGLISH',
        status: 'READ',
        isbn: 1212354465,
        id: 1,
      },
      {
        title: 'Never Fade',
        author: 'Alexandra Braken',
        pages: 507,
        language: 'ENGLISH',
        status: 'READ',
        isbn: 1212354466,
        id: 2,
      },
      {
        title: 'In the afterlight',
        author: 'Alexandra Braken',
        pages: 544,
        language: 'ENGLISH',
        status: 'READ',
        isbn: 1212354467,
        id: 3,
      },
    ]),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    bookservice = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(bookservice).toBeDefined();
  });

  it('persists a book in the DB and returns it', async () => {
    const dto = {
      title: 'Book1',
      author: 'Myself',
      pages: 150,
      language: 'ENGLISH',
      status: 'READ',
      isbn: 1212354465,
    };

    let book = mockBookRepository.create(dto);
    expect(book.title).toBe('Book1');

    const book_1 = await mockBookRepository.save(book);
    expect(await book_1.author).toBe('Myself');
  });

  it('finds all books persisted in the db and returns them', async () => {
    const result = await mockBookRepository.findAll();

    expect(result[0].author).toEqual('Alexandra Braken');
    expect(result[1].title).toEqual('Never Fade');
    expect(result[2].id).toBe(3);

    expect(result[3]).toBeFalsy;
  });

  it('finds one book and returns it', async () => {});
});