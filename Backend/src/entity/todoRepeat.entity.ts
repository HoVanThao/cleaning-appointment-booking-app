import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from '../entity/todo.entity';
import { RepeatOptionEnum } from '../enums/repeatOption.enum';

@Entity()
export class TodoRepeat {
  @PrimaryGeneratedColumn()
  repeat_id: number;

  @ManyToOne(() => Todo)
  @JoinColumn({ name: 'todo_id' })
  todo: Todo;

  @Column({ type: 'enum', enum: RepeatOptionEnum })
  repeat_option: RepeatOptionEnum;

  @Column()
  repeat_days: string;

  @Column()
  repeat_interval: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
