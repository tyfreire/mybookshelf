import { IsString,IsNumber } from "class-validator";


export class CreateBookDto{
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  pages: number;

  @IsString()
  language: string;

  @IsString()
  status: string;

  @IsNumber()
  isbn: number;
}