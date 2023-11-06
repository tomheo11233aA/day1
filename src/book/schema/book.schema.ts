import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Category {
  FICTION = 'fiction',
  NON_FICTION = 'non-fiction',
  SCIENCE = 'science',
  HISTORY = 'history',
  BIOGRAPHY = 'biography',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;
}
export const BookSchema = SchemaFactory.createForClass(Book);
