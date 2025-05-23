import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Product } from "../../products/entities/product.entity";
import { Status } from "../enums/status.enum";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'date' })
  orderDate: Date;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  @ManyToMany(() => Product, { cascade: true })
  @JoinTable({ name: 'order_products' })
  products: Product[]
}
