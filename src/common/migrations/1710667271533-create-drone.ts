import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDrone1710667271533 implements MigrationInterface {
  name = 'CreateDrone1710667271533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "drone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" text, "type" character varying NOT NULL, "imageId" uuid, CONSTRAINT "PK_2ac525cb1c63c95423e754dd41f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "drone" ADD CONSTRAINT "FK_333573c2ed701068cb03bd7d60d" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "drone" DROP CONSTRAINT "FK_333573c2ed701068cb03bd7d60d"`,
    );
    await queryRunner.query(`DROP TABLE "drone"`);
  }
}
