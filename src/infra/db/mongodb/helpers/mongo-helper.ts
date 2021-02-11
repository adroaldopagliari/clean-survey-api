import { MongoClient } from 'mongodb';

const MongoHelper = {
  client: null as MongoClient,

  async connect(_uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },
};

export default MongoHelper;
