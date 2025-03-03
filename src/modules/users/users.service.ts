import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(nome: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { nome } });
    return user || undefined;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
}

  async create(nome: string, email: string, senha: string): Promise<User> {
    const user = this.usersRepository.create({ nome, email, senha });
    return this.usersRepository.save(user);
  }
  
  
}
