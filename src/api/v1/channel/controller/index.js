// import Channel from '../models/index.js';

// const channelController = {
//   getChannel: async (req, res) => {
//     const userID = req.query.userID;
//     try {
//       // Find the channel and populate the chatId field with actual Chat documents
//       const channels = await Channel.find({
//         $or: [{ senderId: userID }, { receiverId: userID }],
//       })
//         .populate('chatId')  // Populate the chatId field with Chat documents
//         .exec();

//       if (channels.length === 0) {
//         return res.status(404).json({ message: "No channels found with the given userID" });
//       }

//       res.status(200).json(channels);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
// };

// export default channelController;

// import User from '../../users/models/index.js';
// import Channel from '../models/index.js';

// const channelController = {
//   getChannel: async (req, res) => {
//     const userID = req.query.userID;  // Get userID from query params
//     try {
//       // Fetch user information based on userID
//       const user = await User.findById(userID);
      
//       // If the user doesn't exist
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // Log the userName to the console
//       console.log("Fetched userName:", user.userName);  // Log the userName

//       // Find the channels where the user is either the sender or receiver
//       const channels = await Channel.find({
//         $or: [{ senderId: userID }, { receiverId: userID }],
//       })
//         .populate('chatId')  // Populate the chatId field with Chat documents
//         .exec();

//       // If no channels found
//       if (channels.length === 0) {
//         return res.status(404).json({ message: "No channels found with the given userID" });
//       }

//       // Add the userName to each channel for sender and receiver
//       for (let channel of channels) {
//         // Add userName for sender
//         const sender = await User.findById(channel.senderId);
//         if (sender) {
//           channel.senderName = sender.userName;
//         }

//         // Add userName for receiver
//         const receiver = await User.findById(channel.receiverId);
//         if (receiver) {
//           channel.receiverName = receiver.userName;
//         }
//       }

//       // Send the populated channel information
//       res.status(200).json({
//         userName: user.userName, // Send the userName of the user from the query
//         channels: channels, // Send the channels with senderName and receiverName
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
// };

// export default channelController;

import User from '../../users/models/index.js';
import Channel from '../models/index.js';

const channelController = {
  getChannel: async (req, res) => {
    const userID = req.query.userID;  
    try {
      const user = await User.findById(userID);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const channels = await Channel.find({
        $or: [{ senderId: userID }, { receiverId: userID }], 
      })
        .populate('chatId') 
        .exec();
      if (channels.length === 0) {
        return res.status(404).json({ message: "No channels found with the given userID" });
      }
      for (let channel of channels) {
        const sender = await User.findById(channel.senderId);
        if (sender) {
          channel.senderName = sender.userName;
        }
        const receiver = await User.findById(channel.receiverId);
        if (receiver) {
          channel.receiverName = receiver.userName;
        }
      }
      res.status(200).json({
        userName: user.userName, 
        channels: channels.map(channel => ({
          senderName: channel.senderName,
          receiverName: channel.receiverName, 
          ...channel.toObject() 
        }))
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default channelController;
