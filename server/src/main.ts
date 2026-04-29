import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { logStartup } from './common/logger/startup-logger';
import { logRoutes } from './common/logger/route-logger';
import { appConfig } from './config';
import { setupApiDocs } from './config/api-docs.config';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    setupApiDocs(app);

    await app.listen(appConfig.port);

    await logRoutes(app);

    logStartup(appConfig.port);
}
bootstrap();