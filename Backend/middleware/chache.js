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

cache.on('flush', async () => {
	try {
		const keys = cache.keys();
		console.log('Saving cache to db');
		for (const key of keys) {
			const value = cache.get(key);
			if (value !== undefined) {
				console.log('Saving', key);
				await userQueries.saveCachedUser(key, value);
			}
		}
		console.log('Done saving cache to db');
	} catch (e) {
		console.log(e);
	}
});

export default cache;
