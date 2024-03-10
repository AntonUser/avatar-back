import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { environment } from '../../../environment';
import { JwtService } from '@nestjs/jwt';
import { IAuthTokens } from '../../../common/interfaces/auth-tokens.interface';
import { IJwtPayload } from '../../../common/interfaces/jwt-payload.interface';
import { LoginDTO } from '../dto/login.dto';
import { UsersService } from '../../users/services/users.service';
import { Errors } from '../enums/errors.enum';
import { UsersEntity } from '../../users/entities/users.entity';
import { RegistrationDTO } from '../dto/registration.dto';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  async login(dto: LoginDTO): Promise<IAuthTokens> {
    let user: UsersEntity;
    try {
      user = await this.usersService.findByEmailOrPhone(dto.emailOrPhone);
    } catch (err) {
      throw new BadRequestException(Errors.INCORRECTLY_PASSWORD);
    }

    if (!this.usersService.comparePassword(dto.password, user.password)) {
      throw new BadRequestException(Errors.INCORRECTLY_EMAIL_OR_PHONE);
    }

    return this.getTokens(user.id);
  }

  async registration(dto: RegistrationDTO): Promise<IAuthTokens> {
    let user: UsersEntity;
    try {
      user = await this.usersService.create(dto);
    } catch (err) {
      throw new ConflictException(Errors.USER_ALREADY_EXIST);
    }
    return this.getTokens(user.id);
  }

  async getTokens(userId: string): Promise<IAuthTokens> {
    const jwtPayload: IJwtPayload = {
      id: userId,
    };

    const {
      tokenKeys: { accessKey, refreshKey },
    } = environment;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: accessKey,
        expiresIn: environment.tokenKeys.accessTokenExpiresIn,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: refreshKey,
        expiresIn: environment.tokenKeys.refreshTokenExpiresIn,
      }),
    ]);

    await this.redisService.set<string>(
      this.getRefreshTokenKey(refreshToken),
      refreshToken,
      environment.tokenKeys.refreshTokenExpiresIn / 1000,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(token: string): Promise<boolean> {
    const key = this.getRefreshTokenKey(token);
    await this.redisService.delete(key);
    return true;
  }

  getRefreshTokenKey(token: string): string {
    return `refresh-${token}`;
  }
}
