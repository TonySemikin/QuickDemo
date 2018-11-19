const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');

const app = express();
const router = require('./src/router');

app.use(cors());
router(app);

const port = process.env.PORT || 3030;
const server = http.createServer(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
};

server.listen(port);
console.log(`Server is listening on port: ${port}`);
