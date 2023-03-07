import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678188728867 implements MigrationInterface {
    name = 'default1678188728867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastname\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`birthDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`gender\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birthDate\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastname\``);
    }

}
