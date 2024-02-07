import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`SERVER START ON PORT: ${PORT}`));
}
bootstrap();
