const assert = require('assert');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const User = require('../MCO-CCAPDEV/mongo model/user.model'); // Import your MongoDB model

let mongoServer;

before(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
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
    };

    // Act
    const result = await User.create(testData);

    // Assert
    assert.strictEqual(result.username, testData.username);
    assert.strictEqual(result.password, testData.password);
    assert.strictEqual(result.role, 'User');
    assert.strictEqual(result.avatar, '/static/images/default-avatar.jpg');
    assert.strictEqual(result.profileDescription, "");
    assert.strictEqual(result.establishmentPhotos, []);
    assert.strictEqual(result.likes, []);
    assert.strictEqual(result.dislikes, []);

    
    const storedUser = await User.findOne({ email: testData.email });
    assert(storedUser, 'User not found in the database');
    assert.strictEqual(storedUser.name, testData.name);

    });
});
