import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

export enum BookLanguage{
  ENGLISH = 'english',
  GERMAN = 'german',
  PORTUGUESE = 'portuguese',
  ITALIAN = 'italian'
}

export enum BookStatus{
  TBR = 'tbr',
  WIP = 'wip',
  READ ='read',
  PENDING = 'pending'
}
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

@Column({
  type: "enum",
  enum: BookLanguage,
  default: BookLanguage.ENGLISH
})
language: BookLanguage;

@Column({
  type: "enum",
  enum: BookStatus,
  default: BookStatus.TBR
})
  status:BookLanguage;

  @Column()
  isbn:number;
}
