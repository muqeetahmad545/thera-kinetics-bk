import { Router } from 'express';
import defineSwagger from '../apiDocs/doc.js';
import authController from '../controller/index.js';


const authRoutes = Router();

defineSwagger(authRoutes, authController); 

export default authRoutes;
