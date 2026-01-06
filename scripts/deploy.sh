#!/bin/bash
set -e

echo "🚀 Iniciando deploy..."

# Pull das imagens
docker-compose pull

# Migrações do banco
docker-compose run --rm app npm run migration:run

# Subir serviços
docker-compose up -d --remove-orphans

# Health check
sleep 10
curl -f http://localhost:3000/health || exit 1

echo "✅ Deploy concluído!"