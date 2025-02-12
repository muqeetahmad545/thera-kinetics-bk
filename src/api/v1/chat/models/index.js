
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: false,
    },
    receiverId: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
    chanelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    messageType: {
      type: String,
      enum: ['text', 'image', 'video'],
      default: 'text',
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
