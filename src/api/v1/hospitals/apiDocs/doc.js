/**
 * @swagger
 * /hospital/listAll:
 *   get:
 *     summary: Get a list of all hospitals
 *     tags:
 *       - Hospital
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default is 1)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Limit of results per page (default is 10)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved list of hospitals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Hospital'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalRecords:
 *                       type: integer
 *       500:
 *         description: Server error
 * 
 * /hospital/create:
 *   post:
 *     summary: Create a new hospital
 *     tags:
 *       - Hospital
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       description: The hospital data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospitalName:
 *                 type: string
 *               address:
 *                 type: string 
 *               about:
 *                 type: string
 *               patients:
 *                 type: string
 *               hospitalImages:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       201:
 *         description: Hospital created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Hospital'
 *       500:
 *         description: Server error
 */
 
// Define the Hospital schema for Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Hospital:
 *       type: object
 *       properties:
 *         hospitalName:
 *           type: string
 *         address:
 *           type: string 
 *         about:
 *           type: string
 *         patients:
 *           type: string
 *         hospitalImages:
 *           type: string
 *         rating:
 *           type: number
 */



export default function defineSwagger(hospitalsRoutes, hospitalsController, protectRoutes) {
  hospitalsRoutes.post('/create', protectRoutes, hospitalsController.createHospitals);
  hospitalsRoutes.get('/listAll', protectRoutes, hospitalsController.getHospitals);
  hospitalsRoutes.patch('/update', protectRoutes, hospitalsController.updateHospital);
}
