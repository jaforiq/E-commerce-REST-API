import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  id: string;
  role: string;
}

// export const authenticate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     console.log('Headers: ',req.headers.authorization);
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       res.status(401).json({ error: 'Authentication required' });
//       return;
//     }
    
//     console.log('Token: ',token);
//     const secret = process.env.JWT_SECRET ?? 'secret';
//     const decoded = jwt.verify(
//       token,
//       secret
//     ) as JwtPayload;
// console.log('Decoded: ',decoded);
//     const user = await User.findById(decoded.id).select('-password');
// console.log('User: ',user);
//     if (!user) {
//       res.status(401).json({ error: 'User not found' });
//       return;
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };


interface JwtPayload {
  id: string;
  role: string;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    // Accept "Bearer <token>" or just "<token>"
    const parts = authHeader.split(' ');
    const token = parts.length === 2 ? parts[1] : parts[0];

    console.log('Token: ', token);

    // Use the same secret that you used when signing tokens
    const secret = 'your_super_secret_jwt_key';

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, secret) as JwtPayload;
      console.log('Decoded: ', decoded);
    } catch (verifyErr: any) {
      console.error('jwt.verify error:', verifyErr);
      if (verifyErr.name === 'TokenExpiredError') {
        res.status(401).json({ error: 'Token expired' });
        return;
      }
      if (verifyErr.name === 'JsonWebTokenError') {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }
      // fallback
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    const user = await User.findById(decoded.id).select('-password');
    console.log('User: ', user);
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    // attach user to request — you might want to augment Request type elsewhere
    (req as any).user = user;
    next();
  } catch (error) {
    console.error('authenticate middleware error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};


export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.' 
      });
      return;
    }

    next();
  };
};