import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: false,
    },
    receiverId: {
      type: String,
      required: false,
    },
    chatId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
      },
    ],
  },
  { timestamps: true }
);

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;
