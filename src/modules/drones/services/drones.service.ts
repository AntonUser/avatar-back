import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { IDrone } from '../interfaces/drone.interface';
import { CreateDroneDTO } from '../dto/create-drone.dto';
import { DroneEntity } from '../entities/drone.entity';
import { UpdateDroneDTO } from '../dto/update-drone.dto';
import { ListResponse } from '../../../common/interfaces/list-response.interface';
import { GetDronesDTO } from '../dto/get-drones.dto';
import { getWithPagination } from '../../../common/helpers/get-with-pagination.helper';
import { SortDirectionParams } from '../../../common/entities/sort-direction-params.enum';

@Injectable()
export class DronesService {
  private readonly alias: string;
  private readonly repository: Repository<DroneEntity>;
  constructor(entityManager: EntityManager) {
    this.repository = entityManager.getRepository(DroneEntity);
    this.alias = 'drones';
  }

  create(dto: CreateDroneDTO): Promise<IDrone> {
    return this.repository.save(dto);
  }

  async update(id: string, dto: UpdateDroneDTO): Promise<boolean> {
    await this.repository.save({ id, ...dto });
    return true;
  }

  getList(dto: GetDronesDTO): Promise<ListResponse<IDrone>> {
    const query = this.repository.createQueryBuilder(this.alias);
    if (dto.type) {
      query.andWhere(`${this.alias}.type = :type`, { type: dto.type });
    }

    if (dto.ids) {
      query.andWhere(`${this.alias}.id IN (:...ids)`, { ids: dto.ids });
    }

    if (dto.sortBy) {
      query.orderBy(
        `${this.alias}.${dto.sortBy}`,
        dto.sortDirection ?? SortDirectionParams.ASC,
      );
    }

    return getWithPagination(query, dto);
  }

  getById(id: string): Promise<IDrone> {
    return this.repository.findOneOrFail({
      where: { id },
      relations: ['image'],
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.repository.delete({ id });
    return true;
  }
}
