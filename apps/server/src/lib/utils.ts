import jwt from 'jsonwebtoken';

const validateSignupInput = (email: string, password: string, fullName: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password || !fullName) {
    return 'All fields are required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }

  return null;
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

export { validateSignupInput, generateToken, getRandomAvatar };
