import bcrypt from 'bcrypt';
import { BcryptAdatper } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'));
  },
}));

const salt = () => 12;

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const sut = new BcryptAdatper(salt());
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt());
  });

  it('Should return a hash on success', async () => {
    const sut = new BcryptAdatper(salt());
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });
});
