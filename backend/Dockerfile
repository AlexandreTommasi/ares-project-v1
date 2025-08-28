# Stage 1: Build da Aplicação
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copia os arquivos de manifesto de pacotes e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Remove as dependências de desenvolvimento para reduzir o tamanho da imagem final
RUN npm prune --production

# --- 

# Stage 2: Imagem de Produção
FROM node:20-alpine

WORKDIR /usr/src/app

# Cria um usuário e grupo não-root para aumentar a segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copia as dependências de produção e o código compilado do estágio de build
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json .

# Define o usuário não-root como proprietário dos arquivos
RUN chown -R appuser:appgroup /usr/src/app

# Muda para o usuário não-root
USER appuser

# Expõe a porta em que a aplicação será executada
EXPOSE 3000

# Healthcheck para verificar a saúde da aplicação
# Instala o 'wget' que é necessário para o healthcheck
RUN apk add --no-cache wget
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -q -O - http://localhost:3000/health || exit 1

# Comando padrão para iniciar a aplicação
CMD [ "node", "dist/server.js" ]
