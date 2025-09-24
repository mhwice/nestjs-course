import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // adds 'ValidationPipe' to every controller
  app.useGlobalPipes(new ValidationPipe({
    // additional fields not in the dto will be automatically removed,
    // the request will still get to the controller, but only
    // fields specified from the dto will exist
    whitelist: true,

    // additional fields not in the dto will cause an error to be thrown
    // and the entire request will fail
    forbidNonWhitelisted: true,

    // takes the validated dto object
    // and gives it the type associated with the dto
    // essentially this gives us the result of zod.parse
    transform: true
  }));

  // swagger config
  const config = new DocumentBuilder()
    .setTitle("Blog")
    .setDescription("Use the base API URL of http://localhost:3000")
    .setTermsOfService("http://localhost:3000/tos")
    .setLicense("MIT License", "https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt")
    .addServer("http://localhost:3000")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
