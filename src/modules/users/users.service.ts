import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

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
    return user ?? undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    console.log("Buscando usuário com email:", email); // <-- Adicione este log

    const user = await this.usersRepository.findOne({ where: { email } });

    console.log("Usuário encontrado no banco:", user); // <-- Veja se retorna algo

    return user ?? undefined;
}
  async create(nome: string, email: string, senha: string): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds); 

    const user = this.usersRepository.create({ nome, email, senha: hashedPassword });
    return this.usersRepository.save(user);
  }
}

