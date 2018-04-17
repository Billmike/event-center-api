import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

app.get('*', (request, response) =>
  response.send({
    message: 'Welcome to the event center API'
  })
);

export default app;
