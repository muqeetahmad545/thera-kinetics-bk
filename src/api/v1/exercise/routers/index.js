import { Router } from 'express'; 
import exerciseController from '../controller/index.js'; 
import defineSwagger from '../apiDocs/doc.js';
import protectRoutes from '../../../../middleware/authMiddleware.js';

const exerciseRoutes = Router();
defineSwagger(exerciseRoutes, exerciseController, protectRoutes);

export default exerciseRoutes;
