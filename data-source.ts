import { DataSource } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.NEON_DATABASE_URL,
  migrations: ['src/migrations/**/*.ts'],
  ssl: { rejectUnauthorized: false },
  // host: "localhost",
  // port: 3306,
  // username: "test",
  // password: "test",
  // database: "nestdb",
  entities: ['src/*/entities/*.entity.ts'],
  // migrations: [/*...*/],
  // migrationsTableName: "custom_migration_table",
});