import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Emprestimo (e2e)', () => {
  let app: INestApplication;
  let usuarioId: number;
  let livroId: number;
  let emprestimoId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Criar usuário e livro de teste com tratamento de erro
    try {
      const userRes = await request(app.getHttpServer())
        .post('/usuarios')
        .send({ 
          primeiroNome: 'Emprestimo Test', 
          email: 'emp@test.com', 
          isActive: true 
        })
        .expect(201);
      
      usuarioId = userRes.body.id;
      console.log(`✅ Usuário criado: ${usuarioId}`);
    } catch (error) {
      console.error('❌ Erro ao criar usuário:', error.message);
      throw error;
    }

    try {
      const livroRes = await request(app.getHttpServer())
        .post('/livros')
        .send({ 
          livrotitulo: 'Livro Test Emprestimo', 
          livrodescricao: 'Descrição do livro de teste', 
          livropreco: 10 
        })
        .expect(201);
      
      livroId = livroRes.body.livroid;
      console.log(`✅ Livro criado: ${livroId}`);
    } catch (error) {
      console.error('❌ Erro ao criar livro:', error.message);
      throw error;
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('/emprestimo (POST) should create emprestimo', async () => {
    const response = await request(app.getHttpServer())
      .post('/emprestimo')
      .send({
        usuarioId,
        livroId,
        dataEmprestimo: new Date().toISOString().split('T')[0],
        dataDevolucao: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      })
      .expect(201);
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.status).toBe('ativo');
    expect(response.body.usuario).toBeDefined();
    expect(response.body.livro).toBeDefined();
    
    emprestimoId = response.body.id;
    console.log(`✅ Empréstimo criado: ${emprestimoId}`);
  });

  it('/emprestimo (POST) duplicate should return 400', () => {
    return request(app.getHttpServer())
      .post('/emprestimo')
      .send({
        usuarioId,
        livroId,
        dataEmprestimo: new Date().toISOString().split('T')[0],
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('já está emprestado');
      });
  });

  it('/emprestimo (GET) should return list', () => {
    return request(app.getHttpServer())
      .get('/emprestimo')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  // Teste adicional: buscar empréstimo por ID
  it('/emprestimo/:id (GET) should return specific emprestimo', () => {
    if (!emprestimoId) {
      throw new Error('emprestimoId não foi definido');
    }
    
    return request(app.getHttpServer())
      .get(`/emprestimo/${emprestimoId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(emprestimoId);
        expect(res.body.usuario).toBeDefined();
        expect(res.body.livro).toBeDefined();
      });
  });
});