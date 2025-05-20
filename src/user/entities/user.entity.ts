import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../roles/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Customer,
  })
  role: Role;
}
