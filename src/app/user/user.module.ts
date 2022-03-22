import { Module } from '@nestjs/common';
import {UserDatabaseModule} from './database/user.database-module';
import {UserRestModule} from './rest/user.rest-module';

@Module({
  imports: [UserDatabaseModule, UserRestModule],
})
export class UserModule {}