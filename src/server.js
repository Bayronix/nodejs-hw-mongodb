import express from 'express';

const server = express();

const PORT = 3000;

server.get('/', (request, response) => {
  response.send('<h1>Home Page</h1>');
});

server.get('/contacts', (request, response) => {
  response.send('<h1>Contacts</h1>');
});

server.listen(PORT, () => {
  {
    console.log(`Server started ${PORT}`);
  }
});
