import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm"
import { Product } from "../../products/entities/product.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'date' })
  orderDate: Date;

  @OneToMany(() => Product, (product) => product.order)
  orderItems: Product[];
}
