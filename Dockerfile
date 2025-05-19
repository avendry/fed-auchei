# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos necessários
COPY package.json package-lock.json* ./

# Instala as dependências de produção
RUN npm ci --legacy-peer-deps

# Copia o restante do código
COPY . .

# Compila o TypeScript e gera o build da aplicação
RUN npm run build

# Etapa 2: Servindo a aplicação
FROM node:20-alpine AS runner

WORKDIR /app

# Copia os arquivos necessários do builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Instala o servidor HTTP para servir os arquivos (opcional: usar um servidor mais leve)
RUN npm install -g serve

# Define a porta que o container expõe
EXPOSE 4173

# Comando de inicialização
CMD ["serve", "-s", "dist", "-l", "4173"]
