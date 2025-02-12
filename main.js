import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server as socketIO } from 'socket.io';
import socketHandler from './src/utils/socket.js';
import userRoutes from './src/api/v1/users/routers/index.js';
import authRoutes from './src/api/v1/auth/routers/index.js';
import connectToDatabase from './src/config/dbConfig.js';
import uploadRoutes from './src/api/v1/upload/routers/index.js';
import chatRoutes from './src/api/v1/chat/routers/index.js';
import { swaggerUi, swaggerDocs } from './src/utils/swagger.js';
import handleError from './src/utils/errorHandler.js';
import channelRoutes from './src/api/v1/channel/routers/index.js';
import hospitalsRoutes from './src/api/v1/hospitals/routers/index.js';
import exerciseRoutes from './src/api/v1/exercise/routers/index.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new socketIO(server, {
  cors: {
    origin: "*",
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});
app.set('io', io);
app.use(cors("*"));

app.use(express.json());
connectToDatabase();

const apiVersion = '/api/v1';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(`${apiVersion}/auth`, authRoutes);
app.use(`${apiVersion}/user`, userRoutes);
app.use(`${apiVersion}/chat`, chatRoutes);
app.use(`${apiVersion}/channel`, channelRoutes);
app.use(`${apiVersion}/hospital`, hospitalsRoutes);
app.use(`${apiVersion}/exercise`, exerciseRoutes);
app.use(`${apiVersion}/upload`, uploadRoutes);

socketHandler(io);
app.use(handleError);
const PORT = process.env.PORT || 3010;
server.listen(PORT, () => {
  console.log('Server listening on port'.blue, PORT.toString().green);
});

