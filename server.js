'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { request, response } = require('express');
const Book = require('./models/bookSchema');
const jwt = require('jsonwebtoken');
const getKey = require('./getKey');


const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);


const database = mongoose.connection;
database.on('database error', console.error.bind(console, 'connection fail'));
database.once('database open', _ => {
  console.log('connected on database');
});


app.get('/books', async (request, response) => {
  const token = request.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, async function (error, user) {
    if (error) {
      response.send('invalid token');
    } else {
      const filterQuery = {};
      filterQuery.email = request.query.email;
      const books = await Book.find(filterQuery);
      response.send(books);
      // TODO: add another error catch?
    }
  });
});

app.post('/books', async (request, response) => {
  const token = request.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, async function (error, user) {
    if (error) {
      response.send('invalid token');
    } else {
      try {
        const newBook = await Book.create(request.body);
        response.status(201).send(newBook);
      } catch (error) {
        console.error.apply(error);
        response.status(500).send('server error')
      }
    }
  });
});

app.put('/books/:id', async (request, response) => {
  const token = request.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, async function (error, user) {
    if (error) {
      response.send('invalid token');
    } else {
      try {
        const id = request.params.id;
        const updatedBook = await Book.findByIdAndUpdate(id, request.body, { new: true });
        response.send(updatedBook);
      } catch (error) {
        console.error(error);
        response.status(400).send(`unable to update book ${id}`);
      }
    }
  })
});



app.delete('/books/:id', async (request, response) => {
  const token = request.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, async function (error, user) {
    if (error) {
      response.send('invalid token');
    } else {
      try {
        await Book.findByIdAndDelete(request.params.id);
        response.status(204).send('success')
      } catch (error) {
        console.error.apply(error);
        response.status(500).send('server error')
      }
    }
  })
});

app.get('/test', async (request, response) => {
  const token = request.headers.authorization.split(' ')[1];

  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      response.send('invalid token');
    } else {
      response.send(user);
    }
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
