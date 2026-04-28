import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logStartup } from './common/logger/startup-logger';
import { logRoutes } from './common/logger/route-logger';
import { appConfig } from './config';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Blue Sky API')
        .setDescription('API documentation for Blue Sky Service Hub')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);

    await app.listen(appConfig.port);

    await logRoutes(app);

    logStartup(appConfig.port);
}
bootstrap();