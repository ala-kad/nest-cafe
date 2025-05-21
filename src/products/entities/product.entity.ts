import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "src/orders/entities/order.entity";
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => Order, (order) => order.orderItems)
  public orders: Order[];
}
