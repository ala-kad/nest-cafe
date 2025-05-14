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
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    AuthModule, 
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestcafe',
      entities: [],
      synchronize: true, // Set to false in production
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
