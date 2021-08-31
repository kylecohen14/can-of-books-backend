'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { request, response } = require('express');
const Book = require('./models/bookSchema');

const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.get('/books', async (request, response) => {
  const filterQuery = {};

  if (request.query.email) {
    filterQuery.email = request.query.email;
  }

  const books = await Book.find(filterQuery);
  response.send(books);
});

app.get('/test', (request, response) => {
  response.send('test request received')
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
