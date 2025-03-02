import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from '../../users/users.entity';

@Entity('lista_compras')
export class ListaCompras {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(() => User, user => user.listas)
    id_criador: User;

    @CreateDateColumn()
    data_criacao: Date;

    @UpdateDateColumn()
    data_atualizacao: Date;
}