import express from 'express';
import { initRoutes } from './routes';
import cors from 'cors';

const app = express();
const port = 3000;

const handler = () => {
  app.use(cors());
  app.use(express.urlencoded( {extended: true }));
  app.use(express.json());

  app.listen(port, () => {
    console.log(`Sudoku running on port ${port}`);
  });
  initRoutes(app);
}


handler();
