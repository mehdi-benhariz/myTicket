// config.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly databaseHost: string;
  private readonly databasePort: number;
  private readonly jwtSecret: string;

  constructor() {
    this.databaseHost = process.env.DATABASE_HOST || 'localhost';
    this.databasePort = parseInt(process.env.DATABASE_PORT, 10) || 5432;
    this.jwtSecret = process.env.JWT_SECRET || 'sussybaka';
  }

  getDatabaseHost(): string {
    return this.databaseHost;
  }

  getDatabasePort(): number {
    return this.databasePort;
  }

  getJwtSecret(): string {
    return this.jwtSecret;
  }
}
