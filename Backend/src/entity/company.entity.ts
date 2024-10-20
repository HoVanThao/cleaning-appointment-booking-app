import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Account } from '../entity/account.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  company_id: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column()
  company_name: string;

  @Column()
  address: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  service: string;

  @Column({ type: 'decimal' })
  service_cost: number;

  @Column({ type: 'float' })
  average_rating: number;

  @Column({ type: 'text', nullable: true })
  worktime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
