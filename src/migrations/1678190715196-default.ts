import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678190715196 implements MigrationInterface {
    name = 'default1678190715196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastname\` \`lastName\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastname\` text NOT NULL`);
    }

}
