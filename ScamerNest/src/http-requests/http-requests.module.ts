import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestsService } from './http-requests.service';
import { env } from 'process';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      baseURL: env.BASE_URL,
      auth: {
        username: env.BASIC_AUTH_USERNAME,
        password: env.BASIC_AUTH_PASSWORD,
      }
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '/upload',
        limits: { fileSize: 1024 * 1024 * 30 }
      }),
    }),
  ],
  providers: [HttpRequestsService],
  exports: [HttpRequestsService]
})
export class HttpRequestsModule { }
