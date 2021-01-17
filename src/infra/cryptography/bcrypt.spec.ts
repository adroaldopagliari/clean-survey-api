import bcrypt from 'bcrypt';
import { BcryptAdatper } from './bcrypt-adapter';

const salt = () => 12;

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const sut = new BcryptAdatper(salt());
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt());
  });
});
