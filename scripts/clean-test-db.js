const { Client } = require('pg');

async function cleanDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME || 'test',
    password: process.env.DB_PASSWORD || 'test',
    database: process.env.DB_DATABASE || 'test_biblioteca',
  });

  try {
    await client.connect();
    
    // Desconecta todos os usuários do banco
    await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = current_database()
      AND pid <> pg_backend_pid();
    `);
    
    // Remove todas as tabelas
    const tables = await client.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public'
    `);
    
    for (const table of tables.rows) {
      await client.query(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE`);
      console.log(`🗑️  Tabela ${table.tablename} removida`);
    }
    
    console.log('✅ Banco de dados limpo');
  } catch (error) {
    console.error('❌ Erro ao limpar banco:', error.message);
  } finally {
    await client.end();
  }
}

cleanDatabase();