# Stage 1: Build da Aplicação React
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de manifesto de pacotes
COPY package*.json ./

# Instala todas as dependências necessárias para o build
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Define a URL da API como um argumento de build para ser injetado no processo
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Executa o build de produção
RUN npm run build

# --- 

# Stage 2: Servidor de Desenvolvimento/Preview
# NOTA: Para um ambiente de produção real, é altamente recomendável usar um servidor web
# como Nginx para servir os arquivos estáticos. O 'vite preview' não é otimizado para produção.
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de manifesto para instalar apenas as dependências de produção
COPY package*.json ./
RUN npm install --only=production

# Copia os arquivos estáticos gerados no estágio de build
COPY --from=builder /app/dist ./dist

# Expõe a porta do servidor de preview do Vite
EXPOSE 5173

# Comando para iniciar o servidor de preview.
# O argumento '--host' é essencial para expor o servidor para fora do container.
CMD [ "npm", "run", "preview", "--", "--host" ]
