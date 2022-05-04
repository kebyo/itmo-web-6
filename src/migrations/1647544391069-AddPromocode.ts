import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPromocode1647544391069 implements MigrationInterface {
    name = 'AddPromocode1647544391069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "promocodes" ("city" character varying(50) NOT NULL, "product_url" text NOT NULL, "sale_size" double precision NOT NULL, "description" text NOT NULL, "id" SERIAL NOT NULL, "owner_id" integer NOT NULL, CONSTRAINT "PK_cfd49e54a2ddfbc02636f8f2904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "promocodes" ADD CONSTRAINT "FK_7cfa60f3e43950b514f9450549f" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promocodes" DROP CONSTRAINT "FK_7cfa60f3e43950b514f9450549f"`);
        await queryRunner.query(`DROP TABLE "promocodes"`);
    }

}
