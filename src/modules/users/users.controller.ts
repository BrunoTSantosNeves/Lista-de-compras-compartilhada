import { Controller, Get, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersServices: UsersService) {}

@Get()
async findAll() {
    return this.usersServices.findAll();
}

@Post()
async create(@Body() body: { nome: string; email: string; senha: string }) {
  return this.usersServices.create(body.nome, body.email, body.senha);
}

}