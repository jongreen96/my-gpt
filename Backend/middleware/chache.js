import NodeCache from 'node-cache';
import userQueries from '../db/queries/userQueries.js';

export const ttl = 120; // 2 minutes

const cache = new NodeCache({
	stdTTL: ttl,
	checkperiod: ttl,
});

cache.on('expired', async (key, value) => {
	try {
		await userQueries.saveCachedUser(key, value);
	} catch (e) {
		console.log(e);
	}
});

cache.on('del', async (key, value) => {
	try {
		await userQueries.saveCachedUser(key, value);
	} catch (e) {
		console.log(e);
	}
});

setInterval(() => {
	cache.keys().forEach(async (key) => {
		try {
			const value = cache.get(key);
			if (value) await userQueries.saveCachedUser(key, value);
		} catch (e) {
			console.log(e);
		}
	});
}, ttl * 1000);

export default cache;
