import { IFile } from '../interfaces/file.interface';
import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseRTO } from '../../../common/rto/common-response.rto';
import { BaseEntity } from '../../../common/entities/base.entity';

export class FileRTO extends BaseEntity implements IFile {
  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  size: number;
}

export class OneFileRTO extends CommonResponseRTO<FileRTO> {
  @ApiProperty({ type: FileRTO })
  data: FileRTO;
}
