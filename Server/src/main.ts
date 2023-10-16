import { NestFactory } from '@nestjs/core';
import { AppModule, AgentModule } from './module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(80);
  console.log('app ready');

  const agent = await NestFactory.create(AgentModule);
  await agent.listen(7000, 'localhost');
  console.log('agent ready');
}

bootstrap();
