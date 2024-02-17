import express, { Express } from 'express';
import { sequelize } from './config/sequalizeConfig';
import profileRouter from '../src/routes/profileRoutes';
//import Cards from './models/cards';
// import associations from './models/associations';

const app: Express = express();

// associations();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB Synced');
  })
  .catch((err: Error) => {
    console.log('An error occured', err);
  });

app.use(express.json());
app.use('/', profileRouter);

app.listen(3000, () => {
  console.log(`Server started successfully on PORT 3000`);
});
