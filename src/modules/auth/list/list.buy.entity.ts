import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/users.entity';

@Entity('listas_compras') // Definir explicitamente o nome da tabela
export class ListaCompras {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(() => User, (user) => user.listas, { eager: true })
    @JoinColumn({ name: 'id_criador' }) 
    criador: User; 

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_criacao: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: "CURRENT_TIMESTAMP" })
    data_atualizacao: Date;
}
