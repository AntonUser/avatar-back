import { ApiProperty } from '@nestjs/swagger';

import { CommonResponseRTO } from './common-response.rto';

export class BooleanResponseRTO extends CommonResponseRTO<boolean> {
  @ApiProperty({ type: Boolean })
  data: boolean;
}
