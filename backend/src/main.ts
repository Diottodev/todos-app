import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';

const config = new DocumentBuilder()
  .setTitle('Documentação API Lista de Tarefas')
  .setDescription('Endpoints para gerenciamento de tarefas')
  .setVersion('1.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    },
    'default',
  )
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.setGlobalPrefix('api'); // Adiciona o prefixo /api em todas as rotas
  console.log(
    'Documentação Swagger disponível em: http://localhost:8080/api/docs',
  );
  await app.listen(process.env.PORT ?? 8080, '0.0.0.0');
}
void bootstrap();
