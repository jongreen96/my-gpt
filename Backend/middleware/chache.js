import NodeCache from 'node-cache';
import userQueries from '../db/queries/userQueries.js';

const cache = new NodeCache({
	stdTTL: 3600 /* 1 hour */,
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
