import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContestantsModule } from './contestants/contestants.module';
import { BattlesModule } from './battles/battles.module';
import { DictatorsModule } from './dictators/dictators.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { BmTransactionsModule } from './bmtransactions/bmtransactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configuración de TypeORM para conectar a la base de datos de Supabase
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos
      url: process.env.DATABASE_URL, // Usamos la variable de entorno para la conexión
      synchronize: true, // Solo para desarrollo, no se recomienda en producción
      autoLoadEntities: true, // Cargar automáticamente las entidades
    }),

    // Importamos los módulos correspondientes para cada entidad
    ContestantsModule, // Manejo de esclavos
    BattlesModule, // Manejo de peleas
    DictatorsModule, // Manejo de dictadores
    SponsorsModule, // Manejo de patrocinadores
    BmTransactionsModule, // Manejo del mercado negro
  ],
})
export class AppModule {}