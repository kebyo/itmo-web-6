import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StorageDatabaseModule } from '../../storage/database/storage.database-module';
import { User } from './user.entity';
import { UserQueryService } from './user.query-service';
import { UserService } from './user.service';
import { UserAuthPassword } from './userAuthPassword.entity';
import { UserAuthToken } from './userAuthToken.entity';
import { UserPasswordsService } from './userPasswords.service';
import { UserTokensService } from './userTokens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAuthPassword, UserAuthToken]),
    forwardRef(() => StorageDatabaseModule),
  ],
  providers: [
    UserService,
    UserQueryService,
    UserPasswordsService,
    UserTokensService,
  ],
  exports: [
    TypeOrmModule,
    UserService,
    UserQueryService,
    UserPasswordsService,
    UserTokensService,
  ],
})
export class UserDatabaseModule {}
