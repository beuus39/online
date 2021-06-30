import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle("Workflow")
      .setDescription("The Workflow API description")
      .setVersion("1.0.0")
      .addTag('Workflow')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  await app.listen(3000);
}
bootstrap();
