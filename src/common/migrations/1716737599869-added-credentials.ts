import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCredentials1716737599869 implements MigrationInterface {
  name = 'AddedCredentials1716737599869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "drone" ADD "droneIp" text`);
    await queryRunner.query(`ALTER TABLE "drone" ADD "droneToken" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "drone" DROP COLUMN "droneToken"`);
    await queryRunner.query(`ALTER TABLE "drone" DROP COLUMN "droneIp"`);
  }
}
