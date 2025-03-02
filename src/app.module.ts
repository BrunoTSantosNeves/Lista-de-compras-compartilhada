import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ListasModule } from './modules/auth/list/list.module'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'database',
      autoLoadEntities: false,
      synchronize: true,
    }),
    UsersModule,
    ListasModule, // Adicionando o módulo de listas
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
