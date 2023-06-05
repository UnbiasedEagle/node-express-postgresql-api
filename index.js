const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const userRoutes = require('./routes/users');

app.use(express.json());

app.get('/healthcheck', (req, res) => {
  res.json({
    message: 'OK',
  });
});

app.use('/users', userRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
