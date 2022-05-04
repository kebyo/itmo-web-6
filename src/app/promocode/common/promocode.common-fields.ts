import { Column } from 'typeorm';
import {IsUrl} from 'class-validator';

export class PromocodeCommonFields {
	@Column({
		type: 'varchar',
		length: 50,
	})
	city: string;

	@Column('text')
	@IsUrl()
	product_url: string;

	@Column('float')
	sale_size: number;

	@Column('text')
	description: string;
}