import express, { Express } from 'express';
import { sequelize } from './config/sequalizeConfig';

import cardRoutes from './routes/cardRoutes'


// import Cards from './models/cards';

 //import associations from './models/associations';


const app: Express = express();
app.use(express.json());
app.use('/api/v1',cardRoutes);

// associations();
app.use(express.json());

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('DB Synced');
  })
  .catch((err: Error) => {
    console.log('An error occured', err);
  });


app.listen(3000, () => {
  console.log(`Server started successfully on PORT 3000`);
});
