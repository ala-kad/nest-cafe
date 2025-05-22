import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Order } from "../../orders/entities/order.entity";  

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

  @ManyToMany(() =>Order, (order) => order.products)
  orders: Order[]; // This is the inverse side of the relationship

}
