import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677781618202 implements MigrationInterface {
    name = 'default1677781618202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`passwora\` \`password\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`passwora\` text NOT NULL`);
    }

}
