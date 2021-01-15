import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
} from './db-add-account-protocols';

// eslint-disable-next-line import/prefer-default-export
export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise((resolve) => resolve(null));
  }
}
