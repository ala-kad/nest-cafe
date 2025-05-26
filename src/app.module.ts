// Modules
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// 
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Config
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('NEON_DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, 
        ssl: {
          rejectUnauthorized: false, 
        },
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads', // Directory where files will be stored
      limits: {
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
      },
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
