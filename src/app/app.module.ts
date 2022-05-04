import { Module } from '@nestjs/common';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ormConfig} from '../config/ormconfig';
import {PromocodeModule} from './promocode/promocode.module';
import {AuthModule} from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    PromocodeModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
