import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';

interface JwtPayload {
  userId: string;
}

// Protect middleware – only for authenticated users
const protect: RequestHandler = async (req, res, next) => {

  // Get token from cookie
  if (req.cookies && req.cookies.jwt) {
    try {
      const decoded = jwt.verify(
        req.cookies.jwt,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      // Attach the user to the request, excluding password
      req.user = await UserModel.findById(decoded.userId).select('-password') ?? undefined; 

      next();

    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin middleware – only for admin users
const admin: RequestHandler = (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

export { protect, admin };
