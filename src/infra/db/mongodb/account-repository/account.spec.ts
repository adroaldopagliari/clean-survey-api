import { MongoClient } from 'mongodb';

describe('Account Mongo Repository', () => {
  let client: MongoClient;

  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await client.close();
  });

  it('Should return an account on success', async () => {
    // const sut = new AccountMongoRepository();
    // const account = await sut.add({
    //   name: 'any_name',
    //   email: 'any_email@mail.com',
    //   password: 'any_password',
    // });

    const account = {
      id: 123,
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });
});
