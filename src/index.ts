import http, { Server } from 'http';
import { config } from './config';
import connectDB from './db';
import app from './app';

// Start server
(async () => {
  await connectDB();

  const server: Server = http.createServer(app);
  server.keepAliveTimeout = 61000;
  server.headersTimeout = 65000;

  const { host, port } = config.server;
  server.listen(port, () => console.log(`Listening at http://${host}:${port}`));
})();
