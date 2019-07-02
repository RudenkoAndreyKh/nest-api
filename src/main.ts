import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/work', { useNewUrlParser: true });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
