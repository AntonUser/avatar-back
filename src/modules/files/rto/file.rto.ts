import { IFile } from '../interfaces/file.interface';
import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseRTO } from '../../../common/rto/common-response.rto';

export class FileRTO implements IFile {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  id: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  updatedAt: Date;
}

export class OneFileRTO extends CommonResponseRTO<FileRTO> {
  @ApiProperty({ type: FileRTO })
  data: FileRTO;
}
