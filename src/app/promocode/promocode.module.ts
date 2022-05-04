import { Module } from '@nestjs/common';
import {PromocodeDatabaseModule} from './database/promocode.database-module';

@Module({
  imports: [PromocodeDatabaseModule],
})
export class PromocodeModule {}