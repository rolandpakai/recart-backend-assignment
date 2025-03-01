/* eslint-disable no-console */
import { Server } from 'http';
import server from './server';
import { connectToMongoDbWithRetries } from "./db"
import { DEFAULT_PORT } from './defaults';

export async function startServer(server: Server, PORT: number) {
  try {
    await connectToMongoDbWithRetries();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Failed to connect to MongoDB", e);
  }
  try {
    server.listen(PORT, () => {
      console.log(`ReCart Service is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log("Failed to start server", e);
  }
}

const PORT = parseInt(process.env.PORT || DEFAULT_PORT, 10);
startServer(server, PORT);
