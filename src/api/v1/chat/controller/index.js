import Chat from '../models/index.js';

const chatController = {
  sendMessage: async (req, res) => {
    try {
      const { senderId, receiverId, message } = req.body;
      const io = req.app.get('io');  

      if (io && receiverId) {
        io.to(receiverId).emit('receiveMessage', { senderId, message });
      } else {
        console.error('Socket.io or receiverId is not available');
      }

      const newMessage = new Chat({
        senderId,
        receiverId,
        message,
      });

      await newMessage.save();

      res.status(201).json({
        success: true,
        message: 'Message sent successfully!',
        data: newMessage,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  },

  getMessages: async (req, res) => {
    try {
      const { senderId, receiverId } = req.query;
      const messages = await Chat.find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      }).sort({ timestamp: 1 });

      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  },
};

export default chatController;
