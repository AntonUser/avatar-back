import { Module } from '@nestjs/common';
import { DronesService } from './services/drones.service';
import { DronesController } from './controllers/drones.controller';

@Module({ providers: [DronesService], controllers: [DronesController] })
export class DronesModule {}
