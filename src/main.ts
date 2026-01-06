import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('Biblioteca API')
    .setDescription('API para gerenciamento de biblioteca - Fullstack NestJS + Next.js')
    .setVersion('1.0')
    .addTag('usuarios', 'Endpoints relacionados a usuários')
    .addTag('livros', 'Endpoints relacionados a livros')
    .addTag('emprestimos', 'Endpoints relacionados a empréstimos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // Acessível em http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Swagger UI available at: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();