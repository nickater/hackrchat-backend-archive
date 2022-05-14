import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './typeorm.config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRootAsync(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
