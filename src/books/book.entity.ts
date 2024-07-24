import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Book{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  pages: number;

  @Column()
  language: string;

  @Column()
  status: string;

  @Column()
  isbn:number;
}
