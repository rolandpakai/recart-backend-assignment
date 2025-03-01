/* eslint-disable no-console */
import { connectToMongoDb } from ".";

const connectToMongoDbWithRetries = async (triesLeft: number = 3) => {
  try {
    await connectToMongoDb();
  } catch (e) {
    console.log(`Failed to connect to db, tries left: ${triesLeft}`, e);
    if (triesLeft === 0) throw e;

    await new Promise(resolve => setTimeout(resolve, 500));
    await connectToMongoDbWithRetries(triesLeft - 1);
  }
};

export default connectToMongoDbWithRetries;
