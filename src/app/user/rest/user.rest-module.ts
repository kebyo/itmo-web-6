import { Module } from '@nestjs/common';
import {UserDatabaseModule} from '../database/user.database-module';

@Module({
  imports: [UserDatabaseModule],
  providers: [],
  exports: [],
})
export class UserRestModule {}