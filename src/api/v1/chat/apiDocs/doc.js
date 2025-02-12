/**
 * @swagger
 * tags:
 *   - name: Chat
 */

/**
 * @swagger
 * /chat/send:
 *   post:
 *     summary: Send a chat message
 *     tags: 
 *       - Chat
 *     requestBody:
 *       description: The message to send
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: string
 *                 description: The ID of the sender.
 *                 example: "12345"
 *               receiverId:
 *                 type: string
 *                 description: The ID of the receiver.
 *                 example: "67890"
 *               message:
 *                 type: string
 *                 description: The message content.
 *                 example: "Hello, how are you?"
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: The time when the message was sent.
 *                 example: "2025-01-30T12:30:00Z"
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                   example: "Message sent successfully."
 *       400:
 *         description: Bad request (missing fields, invalid input, etc.)
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
 *                   example: "Invalid input"
 *       500:
 *         description: Internal server error
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
 *                   example: "Failed to send message"
 */

/**
 * @swagger
 * /chat/history:
 *   get:
 *     summary: Get chat message history between two users
 *     tags:
 *       - Chat
 *     parameters:
 *       - in: query
 *         name: senderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the sender.
 *         example: "12345"
 *       - in: query
 *         name: receiverId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the receiver.
 *         example: "67890"
 *     responses:
 *       200:
 *         description: List of chat messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       senderId:
 *                         type: string
 *                         example: "12345"
 *                       receiverId:
 *                         type: string
 *                         example: "67890"
 *                       message:
 *                         type: string
 *                         example: "Hello, how are you?"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-30T12:30:00Z"
 *       400:
 *         description: Bad request (missing fields, invalid input, etc.)
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
 *                   example: "Invalid input"
 *       500:
 *         description: Internal server error
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
 *                   example: "Failed to retrieve message history"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         senderId:
 *           type: string
 *           description: The ID of the sender.
 *         receiverId:
 *           type: string
 *           description: The ID of the receiver.
 *         message:
 *           type: string
 *           description: The content of the message.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the message was sent.
 */
export default function defineSwagger(chatRoutes, chatController, protectRoutes) {
  chatRoutes.post('/send', protectRoutes, chatController.sendMessage);
  chatRoutes.get('/history', protectRoutes, chatController.getMessages);
}
