import express from 'express';
import { authRouter } from './routes';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
