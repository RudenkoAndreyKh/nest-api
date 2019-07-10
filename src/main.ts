import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const mongoose = require('mongoose');

const connectionString: string = process.env.MONGO;

mongoose.connect(`mongodb://127.0.0.1:27017/work`, { useNewUrlParser: true });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
