import { MigrationInterface, QueryRunner } from "typeorm"

export class createUsers1658948319820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE table "users" (
            "id" SERIAL NOT NULL, 
            "email" character varying NOT NULL, 
            "bio" character varying DEFAULT '', 
            "image" character varying DEFAULT '', 
            "password" character varying NOT NULL, 
            PRIMARY KEY ("id")
        );`
    );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP table "users";`);
    }

}
