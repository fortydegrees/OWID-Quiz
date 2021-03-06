import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app = express();

const API_PORT = process.env.API_PORT || 3000;


const whitelist = [
  'http://localhost:3031',
  'http://localhost:3000',
  'http://localhost:3003',
  'http://178.62.106.135/',
];

const corsOptions = {
  // origin: (origin, callback) => {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  // optionsSuccessStatus: 200,
  "Access-Control-Allow-Origin": true,
};

app.use(Cors({"Access-Control-Allow-Origin": true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

require('./routes/getCharts')(app);
require('./routes/getSVG')(app);
// require('./routes/addField')(app);
require('./routes/addStats')(app);
require('./routes/getStats')(app);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;
