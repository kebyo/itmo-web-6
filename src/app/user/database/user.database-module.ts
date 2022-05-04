import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity'
import { UserAuthPassword } from './userAuthPassword.entity';
import { UserAuthToken } from './userAuthToken/userAuthToken.entity';
import { UserPasswordsService } from './userPasswords.service';
import { UserTokensService } from './userTokens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAuthPassword, UserAuthToken]),
  ],
  providers: [
    UserPasswordsService,
    UserTokensService,
  ],
  exports: [
    TypeOrmModule,
    UserPasswordsService,
    UserTokensService,
  ],
})
export class UserDatabaseModule {}
