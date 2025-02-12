import express from 'express';
import protectRoutes from '../../../../middleware/authMiddleware.js';
import channelController from '../controller/index.js';

const channelRoutes = express.Router();

channelRoutes.get('/all', protectRoutes, channelController.getChannel);


export default channelRoutes;
