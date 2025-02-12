import User from '../models/index.js';
const userController = {
  getProfile: async (req, res) => {
    try {
      const user = req.user; // User is already added by the protectRoutes middleware
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ user });
    } catch (err) {
      next(err); // This will pass any error to your error handling middleware (if you have one)
    }
  },
  
  
  
  
  getDrAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const allDr = await User.find({ role: 'doctor' })
        .skip(skip)
        
        .limit(limit)
        .populate('patients');

      const totalDoctors = await User.countDocuments({ role: 'doctor' });
      res.json({
        success: true,
        data: allDr,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalDoctors / limit),
          totalRecords: totalDoctors,
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  },  
  getPatientAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const allDr = await User.find({ role: 'user' })
        .skip(skip)
        .limit(limit)
        .populate('doctor');
      const totalUser = await User.countDocuments({ role: 'user' });
      res.json({
        success: true,
        data: allDr,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalUser / limit),
          totalRecords: totalUser,
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  },
     updateUserProfile : async (req, res) => {
      try {
        const userID = req.query.userID;
        const findUser = await User.findById(userID);
        if (!findUser) {
          return res.status(404).json({ message: "User not found" });
        }
        const updatedData = req.body;
        Object.assign(findUser, updatedData);
        await findUser.save();
        return res.status(200).json({
          message: "User updated successfully",
          user: findUser,
        });
      } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Error updating user", error: error.message });
      }
  },

  updateUser: async (req, res) => {
    try {
      const userID = req.query.userID;
      const findUser = await User.findById(userID);
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const updatedData = req.body;
      if (updatedData.doctor && Array.isArray(updatedData.doctor)) {
        updatedData.doctor.forEach(async (newDoctorId) => {
          if (!findUser.doctor.includes(newDoctorId)) {
            const findDoctor = await User.findById(newDoctorId);
            if (!findDoctor) {
              return res.status(404).json({ message: "Dcotor not found" });
            }
            if (!findDoctor.patients.includes(userID)) {
              findDoctor.patients.push(userID);
            }
            findUser.doctor.push(newDoctorId);
            await findDoctor.save();
            await findUser.save();
          }
        });
      }
      return res.status(200).json({
        message: "User updated successfully",
        user: findUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Error updating user", error: error.message });
    }
  },
};

export default userController;
