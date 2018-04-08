import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (request, response) =>
  response.send({
    message: 'Welcome to the event center API'
  })
);

export default app;
