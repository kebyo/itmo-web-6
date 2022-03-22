import { Column, PrimaryGeneratedColumn } from 'typeorm';


export enum TokenType {
  REFRESH = 'REFRESH',
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
}

export class UserAuthTokenFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TokenType })
  type: TokenType;

  @Column({ type: 'varchar', length: 1024 })
  token: string;

  @Column({ type: 'timestamptz', nullable: true })
  expires_at: Date | null;
}
