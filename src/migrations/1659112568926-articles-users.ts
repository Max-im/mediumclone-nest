import { MigrationInterface, QueryRunner } from "typeorm"

export class articlesUsers1659112568926 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "articles" add "authorId" integer;');
        await queryRunner.query('COMMENT ON COLUMN "articles"."createdAt" IS NULL');
        await queryRunner.query('COMMENT ON COLUMN "articles"."updatedAt" IS NULL');
        await queryRunner.query(`
            ALTER TABLE "articles"
            ADD FOREIGN KEY ("authorId") REFERENCES "users"("id") 
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
        ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('COMMENT ON COLUMN "articles"."createdAt" IS NULL');
        await queryRunner.query('COMMENT ON COLUMN "articles"."updatedAt" IS NULL');
        await queryRunner.query('ALTER TABLE "articles" DROP COLUMN "authorId";');
    }
}
