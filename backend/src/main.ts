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
  const document = SwaggerModule.createDocument(app, config);
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }),
  );
  SwaggerModule.setup('api', app, document);
  console.log('Documentação Swagger disponível em: http://localhost:3333/api');
  await app.listen(process.env.PORT ?? 8080, '0.0.0.0');
}
void bootstrap();
