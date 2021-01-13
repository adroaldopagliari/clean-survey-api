import { AccountModel } from '../../../domain/models/account';
import {
  AddAccount,
  AddAccountModel,
} from '../../../domain/usecases/add-account';
import { Encrypter } from '../../protocols/encrypter';

// eslint-disable-next-line import/prefer-default-export
export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    this.encrypter.encrypt(account.password);
    return new Promise((resolve) => resolve(null));
  }
}
