import { MigrationInterface, QueryRunner } from "typeorm"

export class addUsernameToUser1658949740334 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER table "users" ADD "username" character varying NOT NULL UNIQUE;`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER table "users" DROP column "username";`
        );
    }

}
