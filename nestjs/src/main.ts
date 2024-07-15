import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

declare const module:any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    transform:true,
  }))
  await app.listen(4001);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
