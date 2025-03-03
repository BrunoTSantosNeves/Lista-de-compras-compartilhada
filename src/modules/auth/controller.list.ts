import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('list')
export class ListController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllLists() {
    return { message: 'Rota protegida, apenas usuários autenticados podem acessar' };
  }
}