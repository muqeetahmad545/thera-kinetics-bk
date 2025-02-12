import Chat from '../api/v1/chat/models/index.js';
import Channel from '../api/v1/channel/models/index.js';  

const users = {}; 

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('register', (userId) => {
      users[userId] = socket.id;
      console.log(`User registered: ${userId} -> ${socket.id}`);  
    });

    socket.on('clientMessage', async (data) => {
      console.log('Client message received:', data);
      const { senderId, receiverId, message } = data;

      let channel = await Channel.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });

      if (!channel) {
        channel = new Channel({ senderId, receiverId });
        await channel.save();
      }

      const newMessage = new Chat({
        message,
        senderId,  
        receiverId,
        chanelId: channel._id,
      });
      await newMessage.save();
      channel.chatId.push(newMessage._id);
      await channel.save();

      if (users[receiverId]) {
        io.to(users[receiverId]).emit('messageFromClient', { senderId, message });
      } else {
        console.log(`User ${receiverId} is not online`);
      }
    });

    socket.on('doctorMessage', async (data) => {
      console.log('Doctor message received:', data);
      const { senderId, receiverId, message } = data;

      let channel = await Channel.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });

      if (!channel) {
        channel = new Channel({ senderId, receiverId });
        await channel.save();
      }

      const newMessage = new Chat({
        message,
        senderId,   
        receiverId, 
        chanelId: channel._id,
      });
      await newMessage.save();

      channel.chatId.push(newMessage._id);
      await channel.save();
      if (users[receiverId]) {
        io.to(users[receiverId]).emit('messageFromDoctor', { senderId, message });
      } else {
        console.log(`User ${receiverId} is not online`);
      }
    });

    socket.on('disconnect', () => {
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      if (userId) {
        delete users[userId];
        console.log(`User ${userId} disconnected`);
      }
    });
  });
};

export default socketHandler;
