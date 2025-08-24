import { Request, Response } from 'express';

const signup = (_req: Request, res: Response) => {
  res.send('Signup endpoint');
};

const login = (req: Request, res: Response) => {
  res.send('Login endpoint');
};

export { signup, login };
