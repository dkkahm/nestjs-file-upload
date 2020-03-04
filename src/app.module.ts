import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { LoggerMiddleware } from './common/middlewares/logger.middlewares';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
    }),
  ],
})
export class AppModule {
  configure(consumter: MiddlewareConsumer) {
    consumter.apply(LoggerMiddleware).forRoutes('/');
  }
}
