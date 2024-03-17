import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeletedAtInFile1710666941654 implements MigrationInterface {
  name = 'DeletedAtInFile1710666941654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "file" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "deletedAt"`);
  }
}
