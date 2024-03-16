import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDeletedAtInFile1710614339952 implements MigrationInterface {
  name = 'AddedDeletedAtInFile1710614339952';

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "drone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2ac525cb1c63c95423e754dd41f" PRIMARY KEY ("id"))`,
        await queryRunner.query(`ALTER TABLE "file" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`DROP TABLE "drone"`);
    }

}
