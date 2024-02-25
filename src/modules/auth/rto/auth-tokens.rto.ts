import { IAuthTokens } from '../../../common/interfaces/auth-tokens.interface';
import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseRTO } from '../../../common/rto/common-response.rto';

export class AuthTokensRTO implements IAuthTokens {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}

export class OneAuthTokensRTO extends CommonResponseRTO<AuthTokensRTO> {
  @ApiProperty({ type: () => AuthTokensRTO })
  data: AuthTokensRTO;
}
