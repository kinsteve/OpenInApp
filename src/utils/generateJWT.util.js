import jwt from 'jsonwebtoken';

const generateJWTtoken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export { generateJWTtoken };