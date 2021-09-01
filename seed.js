const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./models/bookSchema');


mongoose.connect(process.env.MONGODB_URI);


async function seed() {
  const volume1 = new Book ({
    title: 'The Lion, the Witch, and the Wardrobe',
    description: 'Lucy accidentally discovers a magical world in the back of her wardrobe',
    status: true,
    email: 'kevintheparrotlet@sqwakybird.com',
  });
  volume1.save(function (error) {
    if (error) console.error(error);
    else console.log('The Lion, the Witch, and the Wardrobe');
  });

  const volume2 = new Book ({
    title: 'Hatchet',
    description: 'Kid gets lost in the woods because his plane crashed. Only has a hatchet',
    status: false,
    email: 'hatchet@gmail.com',
  });
  volume2.save(function (error) {
    if (error) console.error(error);
    else console.log('Hatchet');
  });

  const volume3 = new Book ({
    title: 'The Girl on the Train',
    description: 'Commuter catches daily glipses of a seemingly perfect couple...',
    status: true,
    email: 'traingirl@gmail.com',
  });
  volume3.save(function (error) {
    if (error) console.error(error);
    else console.log('The Girl on the Train');
  });
};

// seed();

module.exports = {seed};

// const export= seed;