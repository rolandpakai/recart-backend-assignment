/* eslint-disable no-console */
import { Server } from 'http';
import server from './server';
import { DEFAULT_PORT } from './defaults';

export async function startServer(server: Server, PORT: number) {
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
