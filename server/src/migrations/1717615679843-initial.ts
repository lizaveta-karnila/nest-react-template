import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1717615679843 implements MigrationInterface {
    name = 'Initial1717615679843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"));`);
        await queryRunner.query(`CREATE TABLE "note_entity" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_664c6fdaf79389734ae737f7d27" PRIMARY KEY ("id"));`);
        await queryRunner.query(`ALTER TABLE "note_entity" ADD CONSTRAINT "FK_071177174b1d5a79d9d234847da" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_entity" DROP CONSTRAINT "FK_071177174b1d5a79d9d234847da"`);
        await queryRunner.query(`DROP TABLE "note_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
