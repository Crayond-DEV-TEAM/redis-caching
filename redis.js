const redis = require('redis');
const redisClient = redis.createClient({
	host: '127.0.0.1',
	legacyMode: true,
});
async function redisConnect() {
	return await redisClient.connect();
   }
redisConnect()


module.exports = {redisClient}
