const { redisClient } = require('../redis');
const {  setToken } = require('../utlis/redis');

const handleProfileGet = async (req, res, db) => {
	const { id } = req.params;

	redisClient.get(id, async (err, reply) => {
		if (err || !reply) {
			console.log('From: Postgres ');
			const response = await db.select('*').from('users').where({ id });
			await setToken(id, JSON.stringify(response),'EX',2);
			if (!response.length) return res.status(400).json('Not found');
			return res.status(200).json(response);
		}
		console.log('From: Redis ');
		if (!reply.length) return res.status(400).json('Not found');
		return res.status(200).json(JSON.parse(reply));
	});
};

const handleProfileUpdate = (req, res, db) => {
	const { id } = req.params;
	const { name, age, pet } = req.body;
	db('users')
		.where({ id })
		.update({ name: name })
		.then((resp) => {
			if (resp) {
				res.json({ message: 'success' });
			} else {
				res.status(400).json({ message: 'Not found' });
			}
		})
		.catch((err) => res.status(400).json({ message: 'error updating user' }));
};

module.exports = {
	handleProfileGet,
	handleProfileUpdate,
};
