import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from 'lib/prisma';

interface AuthJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

const privateRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthJwtPayload;
    if (!decoded?.id) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token payload' });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        profilePicUrl: true,
        isOnboarded: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - User not found' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('Error in protectRoute middleware:', error);
    return res.status(401).json({ message: 'Unauthorized - Token verification failed' });
  }
};

export { privateRoute };
