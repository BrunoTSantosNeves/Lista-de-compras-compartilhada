import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 💡 Aqui estamos registrando o repositório do User
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule], // 💡 Precisamos exportar para que ListasModule possa usá-lo
})
export class UsersModule {}
