/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image to Cloudinary
 *     tags:
 *       - Upload
 *     requestBody:
 *       description: The image to upload
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload.
 *                 example: "image.jpg"  
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 profileImage:
 *                   type: string
 *                   description: The URL of the uploaded image
 *                   example: "https://res.cloudinary.com/demo/image/upload/v1614038834/sample.jpg"
 *                 public_id:
 *                   type: string
 *                   description: The public ID of the uploaded image on Cloudinary
 *                   example: "sample_v1614038834"
 *       500:
 *         description: Internal server error during image upload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Image upload failed"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     upload:
 *       type: object
 *       properties:
 *         file:
 *           type: string
 *           format: binary
 *           description: The image file to upload.
 *           example: "image.jpg"  
 */
