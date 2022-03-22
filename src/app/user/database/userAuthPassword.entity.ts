import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity('user_auth_passwords')
export class UserAuthPassword {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.auth_passwords, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Column({ type: 'integer' })
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  hash: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at: Date | null;

  @DeleteDateColumn()
  deleted_at?: Date;
}
