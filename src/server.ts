import express, { Express } from 'express';
import { sequelize } from './config/sequalizeConfig';
import profileRoutes from '../src/routes/profileRoutes';
import cardRoutes from './routes/cardRoutes';
import authenticationRoutes from './routes/authenticationRoutes';
import verifyJWT from './middleware/userJWTcheck';

//import Cards from './models/cards';
import associations from './models/associations';

const app: Express = express();
app.use(express.json());
app.use('/api/v1',  cardRoutes);
app.use('/api/v1', verifyJWT, profileRoutes);
app.use('/', authenticationRoutes);

associations();
app.use(express.json());

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB Synced');
  })
  .catch((err: Error) => {
    console.log('An error occured', err);
  });

app.listen(3000, () => {
  console.log(`Server started successfully on PORT 3000`);
});
