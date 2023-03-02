import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677782011676 implements MigrationInterface {
    name = 'default1677782011676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`passworda\` \`password\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`passworda\` text NOT NULL`);
    }

}
