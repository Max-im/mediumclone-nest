import { MigrationInterface, QueryRunner } from "typeorm"

export class createArticles1659111817822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE table "articles" (
            "id" SERIAL NOT NULL, 
            "slug" character varying NOT NULL, 
            "title" character varying NOT NULL, 
            "body" character varying DEFAULT '', 
            "description" character varying DEFAULT '', 
            "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "tagList" text NOT NULL, 
            "favoriteCount" integer DEFAULT '0', 
            PRIMARY KEY ("id")
        );`);
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP table "articles";`);
    }

}
