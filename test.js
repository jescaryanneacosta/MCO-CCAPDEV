const assert = require('assert');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const User = require('../MCO-CCAPDEV/mongo model/review.model'); 

let mongoServer;

before(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start(); 
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Review Model', () => {
  it('should store values in MongoDB', async () => {
    const testData = {
      username: "Bellingham",
      establishment: "Tapa King",
      rating: 5,
      title: "Bussin Food",
      body: "This food was insanely bussin, tapa is insane 5/5",
      likes: 5,
      dislikes: 100,
    };

    const result = await User.create(testData);

    assert.strictEqual(result.username, testData.username);
    assert.strictEqual(result.establishment, testData.establishment);
    assert.strictEqual(result.rating, testData.rating);
    assert.strictEqual(result.title, testData.title);
    assert.strictEqual(result.body, testData.body);
    assert.strictEqual(result.likes, testData.likes);
    assert.strictEqual(result.dislikes, testData.dislikes);




    

    const storedReview = await User.findOne({ title: testData.title });
    assert(storedReview, 'Review not found in the database');
    assert.strictEqual(storedReview.title, testData.title);

    console.log('Stored Review:', storedReview.toObject());
  });
});
