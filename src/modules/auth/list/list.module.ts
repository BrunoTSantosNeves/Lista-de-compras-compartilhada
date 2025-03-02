import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListaCompras } from './list.buy.entity';
import { ListasService } from './list.service';
import { ListasController } from './list.controller';
import { UsersModule } from '../../users/users.module';
import { User } from '../../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListaCompras, User]), UsersModule], 
  providers: [ListasService], 
  controllers: [ListasController], 
  exports: [ListasService], 
})
export class ListasModule {}
