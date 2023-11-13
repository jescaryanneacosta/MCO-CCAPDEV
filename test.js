const assert = require('assert');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const User = require('../MCO-CCAPDEV/mongo model/user.model'); // Import your MongoDB model

let mongoServer;

before(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start(); // Ensure that the server is started
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Model', () => {
  it('should store values in MongoDB', async () => {
    // Arrange
    const testData = {
      username: "Bellingham",
      password: "zinedinezidane"
      // Add other properties if needed, but make sure they match your User model
    };

    // Act
    const result = await User.create(testData);

    // Assert
    assert.strictEqual(result.username, testData.username);
    assert.strictEqual(result.password, testData.password);
    assert.strictEqual(result.role, 'User');
    assert.strictEqual(result.avatar, '/static/images/default-avatar.jpg');
    assert.strictEqual(result.profileDescription, "");
    assert.strictEqual(result.establishmentPhotos.length, 0);
    assert.strictEqual(result.likes.length, 0); 
    assert.strictEqual(result.dislikes.length, 0); 

    // Check if the user was stored in the database
    const storedUser = await User.findOne({ username: testData.username });
    assert(storedUser, 'User not found in the database');
    assert.strictEqual(storedUser.username, testData.username);
    assert.strictEqual(storedUser.password, testData.password);
  });
});
