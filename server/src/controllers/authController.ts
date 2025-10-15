import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Request, RequestHandler, Response } from 'express';

const secretkey = 'your_super_secret_jwt_key' as jwt.Secret;

// Register new user
export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const user = await User.create({
      email,
      password,
      name,
      role: role || 'user',
    });

    const payload: jwt.JwtPayload = { id: user._id.toString(), role: user.role };
    const token = jwt.sign( payload, secretkey as string, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } as jwt.SignOptions);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const payload: jwt.JwtPayload = { id: user._id.toString(), role: user.role };
    //const token = jwt.sign(payload, secretkey, { expiresIn: JWT_EXPIRES_IN });
    const token = jwt.sign(payload,secretkey as string,{ expiresIn: process.env.JWT_EXPIRES_IN || '1d' } as jwt.SignOptions);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMe: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    res.json({ user: req.user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

