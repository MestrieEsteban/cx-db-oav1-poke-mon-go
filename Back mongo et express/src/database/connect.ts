import mongoose from 'mongoose';

export default async function connect(databaseUri: string): Promise<void> {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on('error', reject);
    db.once('open', resolve);
  });
}
