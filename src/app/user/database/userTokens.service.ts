import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addSeconds, differenceInSeconds } from 'date-fns';
import { MoreThan, Not, Repository } from 'typeorm';

import {
  refreshExpiration,
  refreshTokenReuseTimeout,
} from '../../../config/jwt';
import { User } from './user.entity';
import { UserAuthToken } from './userAuthToken.entity';
import { TokenType } from './userAuthToken.fields';

@Injectable()
export class UserTokensService {
  constructor(
    @InjectRepository(UserAuthToken)
    private readonly userAuthTokenRepo: Repository<UserAuthToken>,
  ) {}

  /**
   * Создает долгосрочный токен
   */
  public async createUserToken(
    user: User,
    type: TokenType,
    token: string,
    expiration = refreshExpiration,
  ) {
    const userToken = new UserAuthToken();
    userToken.type = type;
    userToken.user = user;
    userToken.token = token;
    userToken.expires_at = addSeconds(new Date(), expiration);
    return this.userAuthTokenRepo.save(userToken);
  }

  /**
   * Удаляет старые токены из базы данных
   */
  public async removeOldTokens(userId: number, exclude?: string) {
    const find: any = { user_id: userId };

    if (exclude) {
      find.token = Not(exclude);
    }

    const result = await this.userAuthTokenRepo.delete(find);
    return !!result.affected;
  }

  /**
   * Удаляет старый токен из базы данных
   */
  public async removeOldToken(refreshToken: string) {
    const result = await this.userAuthTokenRepo.delete({
      token: refreshToken,
    });
    return !!result.affected;
  }

  /**
   * Использует долгосрочный токен доступа для аутентификации пользователя
   */
  public async useAuthToken(token: string) {
    const userAuthToken = await this.findAuthToken(token);

    const now = new Date();
    if (
      userAuthToken.expires_at &&
      differenceInSeconds(userAuthToken.expires_at, now) >
        refreshTokenReuseTimeout
    ) {
      userAuthToken.expires_at = addSeconds(now, refreshTokenReuseTimeout);
      await this.userAuthTokenRepo.save(userAuthToken);
    }

    return userAuthToken.user;
  }

  public async findAuthToken(token: string): Promise<UserAuthToken> {
    const userAuthToken = await this.userAuthTokenRepo.findOne({
      where: {
        token,
        type: TokenType.REFRESH,
        expires_at: MoreThan(new Date()),
      },
      relations: ['user'],
    });

    if (!userAuthToken || !userAuthToken.user) {
      throw new UnauthorizedException(`Provided token was invalid`);
    }

    return userAuthToken;
  }
}
