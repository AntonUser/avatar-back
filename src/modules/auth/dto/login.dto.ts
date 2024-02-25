import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailOrPhone } from '../../../common/decorators/is-email-or-phone.decorator';
import { Errors } from '../../../common/enums/errors.enum';

export class LoginDTO {
  @ApiProperty()
  @IsString()
  @EmailOrPhone({ message: Errors.NOT_EMAIL_AND_NOT_PHONE })
  @IsNotEmpty()
  emailOrPhone: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
