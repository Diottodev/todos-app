import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';

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

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: {
        methods,
        credentials: true,
        origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
      },
    },
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log('Documentação Swagger disponível em: http://localhost:3333/api');
  await app.listen(process.env.PORT ?? 3333, '0.0.0.0');
}
void bootstrap();
