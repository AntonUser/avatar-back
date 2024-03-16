import {
  Controller,
  Delete,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { IFile } from '../interfaces/file.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseDecorator } from '../../../common/decorators/api.response.decorator';
import { OneFileRTO } from '../rto/file.rto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RemoveFilesDTO } from '../dto/remove-files.dto';
import { BooleanResponseRTO } from '../../../common/rto/boolean-response.rto';

@ApiTags('Files')
@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({
    summary: 'Загрузить файл',
  })
  @ApiResponseDecorator([
    { code: HttpStatus.OK, options: { type: OneFileRTO } },
  ])
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File): Promise<IFile> {
    return this.filesService.upload(file);
  }

  @ApiOperation({
    summary: 'Удалить файлы',
  })
  @ApiResponseDecorator([
    { code: HttpStatus.OK, options: { type: BooleanResponseRTO } },
  ])
  @Delete()
  remove(@Query() dto: RemoveFilesDTO): Promise<boolean> {
    return this.filesService.remove(dto.names);
  }
}
