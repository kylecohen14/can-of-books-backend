const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const Book = require('./models/bookSchema');

async function clear() {
  try {
    await Book.deleteMany({});
    console.log('Books cleared');
  } catch (error) {
    console.error(error);
  } 
  // finally {
  //   mongoose.disconnect();
  // }
}

clear();

