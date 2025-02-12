/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: The user details to create a new account
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
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, doctor]
 *             required:
 *               - userName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 access_token:
 *                   type: string
 *       400:
 *         description: User with this email already exists
 *       500:
 *         description: Error creating user
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login an existing user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: The user's email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 access_token:
 *                   type: string
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Error logging in
 */

/**
 * @swagger
 * /auth/forgetPassword:
 *   post:
 *     summary: Update the password of a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: The user's email and new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - email
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 password:
 *                   type: string
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid new password format
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, doctor]
 *           default: user
 */


export default function defineSwagger(authRoutes, authController) {
    authRoutes.post('/register', authController.createUser);
    authRoutes.post('/login', authController.loginUser);
    authRoutes.post('/forgetPassword', authController.forgotPassword);
  }
  