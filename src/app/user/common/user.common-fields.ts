import { Column } from 'typeorm';
import {IsEmail} from 'class-validator';


export class UserCommonFields {
	@Column({ type: 'varchar', length: 255, nullable: true })
	name?: string | null;

	@Column({ type: 'varchar', length: 255, unique: true, nullable: true })
	@IsEmail()
	email?: string | null;
}
