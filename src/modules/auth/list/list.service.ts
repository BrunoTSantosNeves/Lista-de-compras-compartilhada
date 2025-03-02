import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ListaCompras } from "./list.buy.entity";
import { User } from "../../users/users.entity"; 

@Injectable()
export class ListasService {
    constructor(
        @InjectRepository(ListaCompras)
        private readonly listasRepository: Repository<ListaCompras>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>, // Adicionando repositório do usuário
    ) {}

    async criarLista(nome: string, idCriador: number): Promise<ListaCompras> {
        const criador = await this.userRepository.findOne({ where: { id: idCriador } });
        if (!criador) throw new Error("Usuário não encontrado");

        const novaLista = this.listasRepository.create({ nome, id_criador: criador });
        return this.listasRepository.save(novaLista);
    }

    async listarListas(): Promise<ListaCompras[]> {
        return this.listasRepository.find({ relations: ['criador'] });
    }

    async buscarLista(id: number): Promise<ListaCompras | null> {
        return this.listasRepository.findOne({ where: { id }, relations: ['criador'] });
    }

    async deletarLista(id: number): Promise<void> {
        await this.listasRepository.delete(id);
    }
}
