import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LivrosModule } from './modules/livros/livros.module';
import { EmprestimoModule } from './modules/emprestimo/emprestimo.module';

@Module({
  imports:


    [
      PrometheusModule.register({
        path: '/metrics',
        defaultMetrics: {
          enabled: true,
        },
      }),
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
entities: [
          __dirname + '/**/*.entity{.ts,.js}',
          __dirname + '/**/entities/*.entity{.ts,.js}'
        ],   
          synchronize: configService.get('NODE_ENV') === 'development',
          logging: configService.get('NODE_ENV') === 'development',
        }),
      }),
      UsuariosModule,
      LivrosModule,
      
      EmprestimoModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }