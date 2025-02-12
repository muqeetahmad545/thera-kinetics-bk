import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPassword = (password) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(await bcrypt.hash(password, 12));
    } catch (error) {
      reject(error);
    }
  });

const comparePassword = (clientPass, dbPass) =>
  bcrypt.compareSync(clientPass, dbPass);

const formatData = (data) => {
  data.dob = new Date(data.dob);
  data.contact = parseInt(data.contact);
  return data;
};

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '30d' }
  );
};

export { hashPassword, comparePassword, formatData, generateToken };
