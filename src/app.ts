import express from 'express';
import { initRoutes } from './routes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

const handler = () => {
  app.use(cors());
  app.use(express.urlencoded( {extended: true }));
  app.use(express.json());

  app.listen(PORT, () => {
    console.log(`Sudoku running on http://localhost:${PORT}`);
  });
  initRoutes(app);
}


handler();
