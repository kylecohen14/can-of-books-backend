'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { request, response } = require('express');
const Book = require('./models/bookSchema');

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
  const filterQuery = {};

  if (request.query.email) {
    filterQuery.email = request.query.email;
  }

  const books = await Book.find(filterQuery);
  response.send(books);
});

app.post('/books', async (request, response) => {
  try {
    const newBook = await Book.create(request.body);
    response.status(201).send(newBook);
  } catch (error) {
    console.error.apply(error);
    response.status(500).send('server error')
  }
});


app.put('/books/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, request.body, { new: true });
    // response.status(204).send('success')
    response.send(updatedBook);

  } catch (error) {
    console.error(error);
    response.status(400).send(`unable to update book ${id}`);
  } 
});


app.delete('/books/:id', async (request, response) => {
  try {
    await Book.findByIdAndDelete(request.params.id);
    response.status(204).send('success')
  } catch (error) {
    console.error.apply(error);
    response.status(500).send('server error')
  } 
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));













// ---------------------------clear.js--------------------/

// async function clear() {
//   try {
//     await Book.deleteMany({});
//     console.log('Books cleared');
//   } catch (error) {
//     console.error(error);
//   } 
//   // finally {
//   //   mongoose.disconnect();
//   // }
// }

// clear();


// -------------------------------seed.js-------------------/

// async function seed() {
//   const volume1 = new Book ({
//     title: 'The Lion, the Witch, and the Wardrobe',
//     description: 'Lucy accidentally discovers a magical world in the back of her wardrobe',
//     status: true,
//     email: 'kevintheparrotlet@sqwakybird.com',
//   });
//   volume1.save(function (error) {
//     if (error) console.error(error);
//     else console.log('The Lion, the Witch, and the Wardrobe');
//   });

//   const volume2 = new Book ({
//     title: 'Hatchet',
//     description: 'Kid gets lost in the woods because his plane crashed. Only has a hatchet',
//     status: false,
//     email: 'hatchet@gmail.com',
//   });
//   volume2.save(function (error) {
//     if (error) console.error(error);
//     else console.log('Hatchet');
//   });

//   const volume3 = new Book ({
//     title: 'The Girl on the Train',
//     description: 'Commuter catches daily glipses of a seemingly perfect couple...',
//     status: true,
//     email: 'traingirl@gmail.com',
//   });
//   volume3.save(function (error) {
//     if (error) console.error(error);
//     else console.log('The Girl on the Train');
//   });
// };

// seed();
