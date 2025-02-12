import { Router } from 'express'; 
import defineSwagger from '../apiDocs/doc.js';
import protectRoutes from '../../../../middleware/authMiddleware.js';
import chatController from '../controller/index.js';

const chatRoutes = Router();
defineSwagger(chatRoutes, chatController, protectRoutes);

export default chatRoutes;


