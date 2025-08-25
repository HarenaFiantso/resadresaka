import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from 'lib/prisma';
import { generateToken, getRandomAvatar, validateLoginInput, validateSignupInput } from 'lib/utils';

const signup = async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;

  try {
    const errorMessage = validateSignupInput(email, password, fullName);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        profilePicUrl: getRandomAvatar(),
      },
    });

    const token = generateToken(newUser.id, newUser.email);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePicUrl: newUser.profilePicUrl,
      },
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const errorMessage = validateLoginInput(email, password);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id, user.email);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        profilePicUrl: user.profilePicUrl,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const onboard = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized - User not found' });
    }

    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

    const missingFields = [
      !fullName && 'fullName',
      !bio && 'bio',
      !nativeLanguage && 'nativeLanguage',
      !learningLanguage && 'learningLanguage',
      !location && 'location',
    ].filter(Boolean);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'All fields are required',
        missingFields,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        bio,
        nativeLanguage,
        learningLanguage,
        location,
        isOnboarded: true,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        profilePicUrl: true,
        bio: true,
        nativeLanguage: true,
        learningLanguage: true,
        location: true,
        isOnboarded: true,
      },
    });

    return res.status(200).json({
      message: 'Onboarding completed successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { signup, login, onboard };
