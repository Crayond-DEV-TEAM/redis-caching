const { redisClient } = require('../controllers/signin');
const setToken = (key, value,...options) => Promise.resolve(redisClient.set(key, value,...options));

module.exports = { setToken };
