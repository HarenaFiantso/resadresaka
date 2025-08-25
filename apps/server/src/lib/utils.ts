import jwt from 'jsonwebtoken';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

const validateSignupInput = (email: string, password: string, fullName: string): string | null => {
  if (!fullName) return 'Full name is required';

  return validateEmail(email) || validatePassword(password);
};

const validateLoginInput = (email: string, password: string): string | null => {
  return validateEmail(email) || validatePassword(password);
};

const generateToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

const getRandomAvatar = () => {
  const idx = Math.floor(Math.random() * 100) + 1;
  return `https://avatar.iran.liara.run/public/${idx}.png`;
};

export { validateSignupInput, validateLoginInput, generateToken, getRandomAvatar };
