import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/encrypter';

// eslint-disable-next-line import/prefer-default-export
export class BcryptAdatper implements Encrypter {
  constructor(private readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }
}
