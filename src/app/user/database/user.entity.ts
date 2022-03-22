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

import { UserFields } from '../common/user.fields';
import { UserAuthPassword } from './userAuthPassword.entity';
import { UserAuthToken } from './userAuthToken/userAuthToken.entity';
import {Promocode} from '../../promocode/database/promocode.entity';

@Entity('users')
export class User extends UserFields {
  @OneToMany(() => UserAuthPassword, (password) => password.user)
  auth_passwords: UserAuthPassword[];

  @OneToMany(() => UserAuthToken, (token) => token.user)
  auth_tokens: UserAuthToken[];

  @OneToMany(() => Promocode, (promocode) => promocode.owner)
  promocodes: Promocode[];

  @BeforeInsert()
  @BeforeUpdate()
  convertEmailToLowercase() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }
}
