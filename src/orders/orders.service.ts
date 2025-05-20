import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>
  ) {}

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['orderItems'] });
  }

  findOne(id: number): Promise<Order | null> {
    return this.ordersRepository.findOne({ where: { id }, relations: ['orderItems'] });
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.ordersRepository.save({ ...updateOrderDto, id });
  }

  async remove(id: number): Promise<void> {
    return await this.ordersRepository.delete(id).then(() => {});
  }
}
