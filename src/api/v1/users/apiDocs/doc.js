/**
 * @swagger
 * /user/listDr:
 *   get:
 *     summary: Get a list of all doctors
 *     tags:
 *       - User
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
 *         description: Successfully retrieved list of doctors
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
 *                     $ref: '#/components/schemas/User'
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
 * /user/profile:
 *   get:
 *     summary: Get the profile of the logged-in user
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error retrieving user profile
 * /user/updateUserProfile:
 *   patch:
 *     summary: Update user information
 *     tags:
 *       - User
 *     parameters:
 *       - name: userID
 *         in: query
 *         description: The user ID to update
 *         required: true
 *         schema:
 *           type: string
 *           example: "60f5b4b8c5f9e547a0d5f6bc"
 *     requestBody:
 *       description: The user data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, doctor]
 *               about:
 *                 type: string
 *               profileImage:
 *                 type: string
 *               experience:
 *                 type: number
 *               rating:
 *                 type: number
 *               address:
 *                 type: string
 *               sessionDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: User not found
 *       500:
 *         description: Error updating user
 */
 
// Define the User schema for Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *         firstName:
 *           type: string 
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string * 
 *         phoneNumber:
 *           type: Number
 *         role:
 *           type: string
 *           enum: [user, doctor]
 *         profileImage:
 *           type: string
 *         about:
 *           type: string
 *         experience:
 *           type: number
 *         rating:
 *           type: number
 *         address:
 *           type: string
 *         sessionDate:
 *           type: string
 *           format: date-time
 *         hospital:
 *          type: string
 */

export default function defineSwagger(userRoutes, userController, protectRoutes) {
  userRoutes.get('/profile', protectRoutes, userController.getProfile);
  userRoutes.get('/listDr', protectRoutes, userController.getDrAll);
  userRoutes.get('/listpatient', protectRoutes, userController.getPatientAll);
  userRoutes.patch('/updateUser', userController.updateUser);
  userRoutes.patch('/updateUserProfile', protectRoutes,userController.updateUserProfile);
}
