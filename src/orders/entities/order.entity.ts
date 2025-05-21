import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Product } from "../../products/entities/product.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'date' })
  orderDate: Date;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[]
}
