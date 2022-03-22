import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Account } from '../../account/database/account.entity';
import { Invite } from '../../invite/database/invite.entity';
import { UserFields } from '../common/user.fields';
import { UserAuthPassword } from './userAuthPassword.entity';
import { UserAuthToken } from './userAuthToken.entity';

@Entity('users')
export class User extends UserFields {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'integer', nullable: true })
  creator_user_id: number | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'creator_user_id',
  })
  creator_user: User | null;

  @OneToMany(() => UserAuthPassword, (password) => password.user)
  auth_passwords: UserAuthPassword[];

  @OneToMany(() => UserAuthToken, (token) => token.user)
  auth_tokens: UserAuthToken[];

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[] | null;

  @OneToMany(() => Invite, (invite) => invite.creator_account)
  created_invites: Invite[] | null;

  @BeforeInsert()
  @BeforeUpdate()
  convertEmailToLowercase() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }
}
