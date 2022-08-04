import { MigrationInterface, QueryRunner } from "typeorm"

export class seed1659629578783 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO tags(name) VALUES ('js'), ('ts'), ('c#');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM tags;`);
    }

}
