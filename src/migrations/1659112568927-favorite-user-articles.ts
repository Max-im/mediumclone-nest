import { MigrationInterface, QueryRunner } from "typeorm"

export class favoriteUserArticles1659112568927 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "users_favorites_articles"(
            "usersId" integer NOT NULL, 
            "articlesId" integer NOT NULL,
            PRIMARY KEY ("usersId", "articlesId")
        );`);
        await queryRunner.query('CREATE INDEX "IDX_favorites_users" ON  "users_favorites_articles" ("usersId");');
        await queryRunner.query('CREATE INDEX "IDX_favorites_articles" ON  "users_favorites_articles" ("articlesId");');
        await queryRunner.query('COMMENT ON COLUMN "articles"."createdAt" IS NULL');
        await queryRunner.query('COMMENT ON COLUMN "articles"."updatedAt" IS NULL');
        await queryRunner.query(`
            ALTER TABLE "users_favorites_articles"
            ADD FOREIGN KEY ("usersId") REFERENCES "users"("id") 
            ON DELETE CASCADE
            ON UPDATE NO ACTION
        ;`);
        await queryRunner.query(`
            ALTER TABLE "users_favorites_articles"
            ADD FOREIGN KEY ("articlesId") REFERENCES "users"("id") 
            ON DELETE CASCADE
            ON UPDATE NO ACTION
        ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('COMMENT ON COLUMN "articles"."createdAt" IS NULL');
        await queryRunner.query('COMMENT ON COLUMN "articles"."updatedAt" IS NULL');
        await queryRunner.query('ALTER TABLE "users_favorites_articles" DROP COLUMN "articlesId";');
        await queryRunner.query('ALTER TABLE "users_favorites_articles" DROP COLUMN "usersId";');
        await queryRunner.query('DROP INDEX "IDX_favorites_users";');
        await queryRunner.query('DROP INDEX "IDX_favorites_articles";');
        await queryRunner.query('DROP TABLE "users_favorites_articles";');
    }
}
