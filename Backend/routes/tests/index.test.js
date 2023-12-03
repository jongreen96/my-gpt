import { expect, describe, it } from 'vitest';
import supertest from 'supertest';
import app from '../../index.js';

describe('Main route', () => {
	it('should return 200', async () => {
		const res = await supertest(app).get('/');
		expect(res.status).toBe(200);
	});

	it('should return 404', async () => {
		const res = await supertest(app).get('/api/invalid');
		expect(res.status).toBe(404);
	});
});
