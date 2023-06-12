// token-blacklist.store.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistStore {
  private readonly blacklist: Set<string>;

  constructor() {
    this.blacklist = new Set();
  }

  async add(token: string): Promise<void> {
    this.blacklist.add(token);
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    return this.blacklist.has(token);
  }
}
