import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677767470402 implements MigrationInterface {
    name = 'default1677767470402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`tile\` \`title\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`title\` \`tile\` text NOT NULL`);
    }

}
