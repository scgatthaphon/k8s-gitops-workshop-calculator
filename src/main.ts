import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${process.env.GRPC_PORT || 50051}`,
      package: ['grpc.health.v1', 'calculator'],
      protoPath: [
        join(__dirname, '../api/proto/v1/healthcheck.proto'),
        join(__dirname, '../api/proto/v1/calculator.proto'),
      ],
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
