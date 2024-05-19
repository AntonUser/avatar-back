import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCameraFieldsInDrone1716124183530
  implements MigrationInterface
{
  name = 'AddedCameraFieldsInDrone1716124183530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "drone" ADD "cameraIp" text`);
    await queryRunner.query(`ALTER TABLE "drone" ADD "cameraLogin" text`);
    await queryRunner.query(`ALTER TABLE "drone" ADD "cameraPassword" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "drone" DROP COLUMN "cameraPassword"`);
    await queryRunner.query(`ALTER TABLE "drone" DROP COLUMN "cameraLogin"`);
    await queryRunner.query(`ALTER TABLE "drone" DROP COLUMN "cameraIp"`);
  }
}
