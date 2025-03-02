import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ListasService } from './list.service';

@Controller('listas')
export class ListasController {
  constructor(private readonly listasService: ListasService) {}

  @Post()
  async criarLista(@Body() body: { nome: string; id_criador: number }) {
    return this.listasService.criarLista(body.nome, body.id_criador);
  }

  @Get()
  async listarListas() {
    return this.listasService.listarListas();
  }

  @Get(':id')
  async buscarLista(@Param('id') id: number) {
    return this.listasService.buscarLista(id);
  }

  @Delete(':id')
  async deletarLista(@Param('id') id: number) {
    return this.listasService.deletarLista(id);
  }
}
