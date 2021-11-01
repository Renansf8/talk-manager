const express = require('express');
const bodyParser = require('body-parser');

const loginRouter = require('./routes/login');
const talkerRouter = require('./routes/talker');
const error = require('./middleware/error');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';
const HTTP_OK_STATUS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.use('/login', loginRouter);

app.use(error);

app.listen(PORT, () => {
  console.log('Online');
});
