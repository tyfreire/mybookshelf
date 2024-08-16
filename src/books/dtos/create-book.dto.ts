import { IsString, IsNumber, IsNotEmpty, Matches } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @Matches(/^(?! )[^s](?:.*[^s])?$/, {
    message: 'Please remove spaces from the beginning or end of the line',
  })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Author cannot be empty' })
  @Matches(/^(?! )[^s](?:.*[^s])?$/, {
    message: 'Please remove spaces from the beginning or end of the line',
  })
  author: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Pages cannot be empty' })
  pages: number;

  @IsString()
  language: string;

  @IsString()
  status: string;

  @IsNumber()
  @IsNotEmpty({ message: 'ISBN cannot be empty' })
  isbn: number;
}
