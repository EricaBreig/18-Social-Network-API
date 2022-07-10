const connection = require('../config/connection');
const { Thought, User, Reaction } = require('../models');
const { getRandomUsername, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // ==================== Drop existing thoughts ==================== 
  await Thought.deleteMany({});

  // ==================== Drop existing users ==================== 
  await User.deleteMany({});

  // ==================== Create empty array to hold the users ==================== 
  const users = [];

  // ==================== Loop 20 times -- add users to the users array ==================== 
  for (let i = 0; i < 20; i++) {
    // ==== Get some random thought objects using a helper function that we imported from ./data ====
    const thoughts = getRandomThoughts(20);

    const fullName = getRandomUsername();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
      first,
      last,
      email,
      thoughts,
    });
  }

  // ==================== Add users to the site and await the results ==================== 
  await User.collection.insertMany(users);

  // ==================== Add thoughts to the site and await the results ==================== 
  await Thought.collection.insertOne({
  });

  // ==================== Log out the seed data to indicate what should appear in the database ==================== 
  console.table(users);
  console.info('Seeding complete! Yay! 🌱');
  process.exit(0);
});
