import { Router } from 'express'; 
import userController from '../controller/index.js'; 
import defineSwagger from '../apiDocs/doc.js';
import protectRoutes from '../../../../middleware/authMiddleware.js';

const userRoutes = Router();
defineSwagger(userRoutes, userController, protectRoutes);

export default userRoutes;
