import { MigrationInterface, QueryRunner } from "typeorm"

export class createTags1658851711491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE table "tags" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP table "tags"`);
    }

}
