import  bcrypt from'bcryptjs';
import { hashPassword, generateToken } from '../../../../helpers/user.js'; 
import User from '../../users/models/index.js'
import handleError from '../../../../utils/errorHandler.js';

const authController = {
  createUser: async (req, res) => {
    
    const userData = req.body;  
    try {
      const existingUser = await User.findOne({ email: userData.email });  
      if (existingUser) {
        return res
          .status(400)
          .json({ message: 'User with this email already exists' });
      }
      const hashedPassword = await hashPassword(userData.password); 
      const newUser = new User({
        email: userData.email,
        password: hashedPassword,
        userName: userData.userName,
        role: userData.role,
      });
      await newUser.save();  
      const token = generateToken(newUser);
      res
        .status(201)
        .json({ message: 'User created successfully', user: newUser,access_token: token  }); 
    } catch (error) {
      handleError(error, req, res, next); 
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try { 
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentilas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const token = generateToken(user);
      res.status(200).json({ message: 'Login successfully', user,access_token: token  });
    } catch (error) {
      handleError(error, req, res, next); 
    }
  },

  forgotPassword : async (req, res) => {
    const { email, newPassword } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (newPassword.length < 8 || !/^[a-zA-Z0-9!@#$%^&*]+$/.test(newPassword)) {
        return res.status(400).json({
          type: "bad",
          message:
            "New password must be at least 8 characters long and contain only letters from A-Z and a-z, digits from 0-9, and special characters",
        });
      }
      if (!newPassword) {
        return res.status(400).json({ message: "New password is required" });
      }
      const newPasswordhashed = await bcrypt.hash(newPassword, 10);
      const password=newPasswordhashed
      user.password = newPasswordhashed;
      await user.save();
      return res.status(200).json({
        message: "Password updated successfully",
        // newPassword,
        password,
        // newPasswordhashed,
      });
    } catch (error) {
      console.error("error",error);
    }
  },

};
export default authController;

