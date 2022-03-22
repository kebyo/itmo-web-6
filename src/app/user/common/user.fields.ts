import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { UserCommonFields } from './user.common-fields';

export class UserFields extends UserCommonFields {
	@PrimaryGeneratedColumn()
	id: number;
}
