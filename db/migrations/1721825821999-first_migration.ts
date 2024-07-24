import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1721825821999 implements MigrationInterface {
    name = 'FirstMigration1721825821999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "pages" integer NOT NULL, "language" character varying NOT NULL, "status" character varying NOT NULL, "isbn" integer NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
