import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFile1710612325912 implements MigrationInterface {
  name = 'CreateFile1710612325912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "mimetype" text NOT NULL, "size" bigint NOT NULL DEFAULT '0', CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "file"`);
  }
}
