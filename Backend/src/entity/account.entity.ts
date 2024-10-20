import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountRoleEnum } from '../enums/account.enum';
import { UserStatusEnum } from '../enums/userStatus.enum';
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  account_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'enum', enum: AccountRoleEnum })
  role: AccountRoleEnum;

  @Column({ type: 'enum', enum: UserStatusEnum })
  status: UserStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
