import { tryNumber } from '@proscom/ui-utils';
import * as process from 'process';

export const appPort = tryNumber(process.env.APP_PORT, 5000);
export const appHost = process.env.APP_HOST || 'localhost';