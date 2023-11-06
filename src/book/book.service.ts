import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schema/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }
  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res.save();
  }
  async findById(id: string): Promise<Book> {
    const res = await this.bookModel.findById(id).exec();
    if (!res) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return res;
  }
  async updateById(id: string, book: Book): Promise<Book> {
    const res = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    if (!res) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return res;
  }
  async deleteById(id: string): Promise<string> {
    const res = await this.bookModel.findByIdAndDelete(id);
    if (!res) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return `This ${res.title} book deleted successfully`;
  }
}
