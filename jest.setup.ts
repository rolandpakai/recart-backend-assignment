import dotenv from "dotenv";
import path from "path";
import { SessionModel } from "./src/db/models/Session";
import { ShopModel } from "./src/db/models/Shop";
import { connectToMongoDbWithRetries, seedDb } from "./src/db";

dotenv.config({
  path: [
    path.join(__dirname, ".env"),
    path.join(__dirname, ".env.test"),
  ],
  override: true,
});

beforeAll(async () => {
  await connectToMongoDbWithRetries();
});

beforeEach(async () => {
  await seedDb();
});

afterEach(async () => {
  await SessionModel.collection.drop();
  await ShopModel.collection.drop();
});


