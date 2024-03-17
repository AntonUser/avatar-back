import { CreateDroneDTO } from '../dto/create-drone.dto';
import { IDrone } from '../interfaces/drone.interface';
import { UpdateDroneDTO } from '../dto/update-drone.dto';
import { GetDronesDTO } from '../dto/get-drones.dto';
import { ListResponse } from '../../../common/interfaces/list-response.interface';
import { DronesService } from '../services/drones.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseDecorator } from '../../../common/decorators/api.response.decorator';
import { ListArticleRTO, OneDroneRTO } from '../rto/drone.rto';
import { BooleanResponseRTO } from '../../../common/rto/boolean-response.rto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Drones')
@Controller('drones')
export class DronesController {
  constructor(private readonly dronesService: DronesService) {}

  @ApiOperation({ description: 'Создать беспилотник' })
  @ApiResponseDecorator([
    { code: HttpStatus.OK, options: { type: OneDroneRTO } },
  ])
  @Post()
  create(@Body() dto: CreateDroneDTO): Promise<IDrone> {
    return this.dronesService.create(dto);
  }

  @ApiOperation({ description: 'Обновить беспилотник' })
  @ApiResponseDecorator([
    { code: HttpStatus.OK, options: { type: BooleanResponseRTO } },
  ])
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDroneDTO,
  ): Promise<boolean> {
    return this.dronesService.update(id, dto);
  }

  @ApiOperation({ description: 'Получить список беспилотников' })
  @ApiResponseDecorator([
    { code: HttpStatus.OK, options: { type: ListArticleRTO } },
  ])
  @Get()
  getList(@Query() dto: GetDronesDTO): Promise<ListResponse<IDrone>> {
    return this.dronesService.getList(dto);
  }

  @ApiOperation({ description: 'Получить беспилотник по id' })
  @ApiResponseDecorator([
    { code: HttpStatus.OK, options: { type: BooleanResponseRTO } },
  ])
  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<IDrone> {
    return this.dronesService.getById(id);
  }

  @ApiOperation({ description: 'Удалить дрон' })
  @ApiResponseDecorator([
    { code: HttpStatus.OK, options: { type: BooleanResponseRTO } },
  ])
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.dronesService.delete(id);
  }
}
