const usernames = [

];
const emails = [
 
];

// ==================== Get a random item given an array ====================
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ====================  Gets a random Username using the getRandomItem function ====================
const getRandomUsername = () => `${getRandomItem(usernames)}`;

// ====================  Gets a random Email using getRandomItem function ====================
const getRandomEmail = () => `${getRandomItem(emails)}`;

// ==================== Export the functions for use in seed.js ====================
module.exports = { getRandomUsername, getRandomEmail };
