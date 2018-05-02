require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const createError = require('http-errors');
const admin = require('firebase-admin');
const morgan = require('morgan');

const winston = require('./config/winston');
const seedData = require('./seed-data');
const { isLoggedInGraphQL } = require('./utils');
const serviceAccount = require('./firebase-config.json');

winston.level = process.env.LOG_LEVEL;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cmca-india.firebaseio.com',
});

// database connection
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', () => winston.log('error', 'Database connection error'));
db.once('open', async () => {
  winston.log('info', 'Database connected');
  const user = seedData();
  if (user) winston.log('info', 'SEEDING SUCCESSFUL');
});

const PORT = 8000;
const app = express();

// cross origin requests configuration
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(morgan('combined', { stream: winston.stream }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// REST api
app.use('/', require('./routes/views.route'));
app.use('/auth', require('./routes/auth.route'));

// GRAPHQL api
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const models = require('./models');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  '/graphql',
  isLoggedInGraphQL,
  graphqlExpress(req => ({
    schema,
    context: { ...models, auth: req.user },
  })),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'Requested resource does not exist'));
});

// error handler
app.use((err, req, res) => {
  const error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(error);
});

app.listen(PORT);
winston.log('info', `EXPRESS RUNNING ON PORT: ${PORT}`);
