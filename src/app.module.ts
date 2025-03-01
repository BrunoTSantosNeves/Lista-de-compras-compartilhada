import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',  // ✅ REMOVA `driver: 'mysql12'` → Não existe essa opção
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,  // ✅ Evita necessidade de listar entidades manualmente
      synchronize: true,  // ✅ Apenas para desenvolvimento! Desative em produção
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
