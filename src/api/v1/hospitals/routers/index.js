import { Router } from 'express'; 
import hospitalsController from '../controller/index.js'; 
import defineSwagger from '../apiDocs/doc.js';
import protectRoutes from '../../../../middleware/authMiddleware.js';

const hospitalsRoutes = Router();
defineSwagger(hospitalsRoutes, hospitalsController, protectRoutes);

export default hospitalsRoutes;
