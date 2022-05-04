import { Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

import {PromocodeCommonFields} from './promocode.common-fields';

export class PromocodeFields extends PromocodeCommonFields {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('int')
	owner_id: number;
}