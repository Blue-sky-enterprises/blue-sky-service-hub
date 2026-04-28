import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupApiDocs(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Blue Sky API')
    .setDescription(`
## 🚀 Blue Sky Service Hub API

A scalable backend built with NestJS following clean architecture principles.

### 🔐 Authentication
Use Bearer token in the format:
\`Authorization: Bearer <token>\`

### 📦 Features
- Modular architecture
- Scalable design
- Swagger + Scalar documentation
    `)
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  app.use(
    '/docs',
    apiReference({
      content: document,
      theme: 'purple',
    }),
  );
}