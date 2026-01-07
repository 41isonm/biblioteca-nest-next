import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LivrosModule } from './modules/livros/livros.module';
import { EmprestimoModule } from './modules/emprestimo/emprestimo.module';
import { Usuario } from './modules/usuarios/domain/entities/usuario.entity';
import { Livro } from './modules/livros/domain/entities/livro.entity';
import { Emprestimo } from './modules/emprestimo/domain/entities/emprestimo.entity';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Configuração para testes
        if (process.env.NODE_ENV === 'test') {
          console.log('🔧 Configurando banco de dados para TESTES...');
          return {
            type: 'postgres',
            host: configService.get('DB_HOST') || 'test-db',
            port: configService.get<number>('DB_PORT') || 5432,
            username: configService.get('DB_USERNAME') || 'test',
            password: configService.get('DB_PASSWORD') || 'test',
            database: configService.get('DB_DATABASE') || 'test_biblioteca',
            entities: [Usuario, Livro, Emprestimo],
            synchronize: true, // Cria tabelas
            dropSchema: false, // Mude para false para evitar conflitos
            logging: ['error'], // Apenas logs de erro
          };
        }

        // Configuração para desenvolvimento/produção
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [Usuario, Livro, Emprestimo],
          synchronize: configService.get('NODE_ENV') === 'development',
          logging: configService.get('NODE_ENV') === 'development',
        };
      },
    }),
    UsuariosModule,
    LivrosModule,
    EmprestimoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }