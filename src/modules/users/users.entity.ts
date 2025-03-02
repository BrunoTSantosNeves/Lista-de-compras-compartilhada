import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ListaCompras } from '../auth/list/list.buy.entity';

@Entity('usuarios') 
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;  

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @OneToMany(() => ListaCompras, (lista) => lista.id_criador)
  listas: ListaCompras[];
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_criacao: Date;
}


