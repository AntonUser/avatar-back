import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IAuthTokens } from '../../../common/interfaces/auth-tokens.interface';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegistrationDTO } from '../dto/registration.dto';
import { ApiResponseDecorator } from '../../../common/decorators/api.response.decorator';
import { AuthGuard } from '@nestjs/passport';
import { OneAuthTokensRTO } from '../rto/auth-tokens.rto';
import { GetUserPayload } from '../../../common/decorators/get-user-payload.decorator';
import { IJwtPayload } from '../../../common/interfaces/jwt-payload.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Авторизация по почте или телефону',
  })
  @ApiResponseDecorator([
    { code: HttpStatus.OK, options: { type: OneAuthTokensRTO } },
  ])
  @Post('login')
  login(@Body() dto: LoginDTO): Promise<IAuthTokens> {
    return this.authService.login(dto);
  }

  @ApiOperation({
    summary: 'Регистрация по почте или телефону',
  })
  @ApiResponseDecorator([
    { code: HttpStatus.OK, options: { type: OneAuthTokensRTO } },
  ])
  @Post('registration')
  registration(@Body() dto: RegistrationDTO): Promise<IAuthTokens> {
    return this.authService.registration(dto);
  }

  @ApiOperation({
    summary: 'Обновление токенов',
  })
  @ApiResponseDecorator([
    { code: HttpStatus.OK, options: { type: OneAuthTokensRTO } },
  ])
  @UseGuards(AuthGuard('jwt-refresh'))
  @Patch('refresh')
  refresh(@GetUserPayload() user: IJwtPayload): Promise<IAuthTokens> {
    return this.authService.getTokens(user.id);
  }
}
