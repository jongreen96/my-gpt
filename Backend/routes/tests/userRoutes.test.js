import { expect, describe, it, afterEach, beforeEach } from 'vitest';
import supertest from 'supertest';
import app from '../../index.js';
import db from '../../db/db.js';

describe('User routes', () => {
	describe('GET /api/user', () => {
		it('should return 200 if valid token is provided', async () => {
			const res = await supertest(app)
				.get('/api/user')
				.set('Authorization', 'Bearer ' + process.env.TEST_VALID_TOKEN);
			expect(res.status).toBe(200);
		});

		it('should return 401 if no token is provided', async () => {
			const res = await supertest(app).get('/api/user');
			expect(res.status).toBe(401);
		});

		it('should return 403 if invalid token is provided', async () => {
			const res = await supertest(app)
				.get('/api/user')
				.set('Authorization', 'Bearer ' + process.env.TEST_INVALID_TOKEN + 'a');
			expect(res.status).toBe(403);
		});

		it('should return 404 if token is valid but user does not exist', async () => {
			const res = await supertest(app)
				.get('/api/user')
				.set('Authorization', 'Bearer ' + process.env.TEST_INVALID_TOKEN);
			expect(res.status).toBe(404);
		});
	});

	describe('POST /api/register', () => {
		let userId;
		let userEmail;

		afterEach(async () => {
			if (userId) {
				await db.query(
					`DELETE FROM gpt_verification WHERE user_id = ${userId}`
				);
			}
			if (userEmail) {
				await db.query(`DELETE FROM gpt_users WHERE email = '${userEmail}'`);
			}
		});

		it('should return 200 if valid email and password are provided', async () => {
			const res = await supertest(app).post('/api/register').send({
				email: process.env.TEST_NEW_EMAIL,
				password: process.env.TEST_VALID_PASSWORD,
			});
			expect(res.status).toBe(200);

			userId = res.body.user.id;
			userEmail = res.body.user.email;
		});

		it('should return 409 if email already exists', async () => {
			const res = await supertest(app).post('/api/register').send({
				email: process.env.TEST_VALID_EMAIL,
				password: process.env.TEST_VALID_PASSWORD,
			});
			expect(res.status).toBe(409);
		});

		it('should return 400 if email is not provided', async () => {
			const res = await supertest(app).post('/api/register').send({
				password: process.env.TEST_VALID_PASSWORD,
			});
			expect(res.status).toBe(400);
		});

		it('should return 400 if password is not provided', async () => {
			const res = await supertest(app).post('/api/register').send({
				email: process.env.TEST_NEW_EMAIL,
			});
			expect(res.status).toBe(400);
		});

		it('should return 400 if email is invalid', async () => {
			const res = await supertest(app).post('/api/register').send({
				email: process.env.TEST_INVALID_EMAIL,
				password: process.env.TEST_VALID_PASSWORD,
			});
			expect(res.status).toBe(400);
		});

		it('should return 400 if password is invalid', async () => {
			const res = await supertest(app).post('/api/register').send({
				email: process.env.TEST_NEW_EMAIL,
				password: process.env.TEST_INVALID_PASSWORD,
			});
			expect(res.status).toBe(400);
		});
	});

	describe('POST /api/verify', () => {
		let userId;
		let userEmail;
		let veriCode;

		beforeEach(async () => {
			const res = await supertest(app).post('/api/register').send({
				email: process.env.TEST_NEW_EMAIL,
				password: process.env.TEST_VALID_PASSWORD,
			});
			userId = res.body.user.id;
			userEmail = res.body.user.email;
			veriCode = res.body.veriCode;
		});

		afterEach(async () => {
			await db.query(`DELETE FROM gpt_verification WHERE user_id = ${userId}`);
			await db.query(`DELETE FROM gpt_users WHERE email = '${userEmail}'`);
		});

		it('should return 200 if valid id and veriCode are provided', async () => {
			const res = await supertest(app).post(`/api/verify`).send({
				id: userId,
				veriCode: veriCode,
			});
			expect(res.status).toBe(200);
		});

		it('should return 400 if id is not provided', async () => {
			const res = await supertest(app).post('/api/verify').send({
				veriCode: veriCode,
			});
			expect(res.status).toBe(400);
		});

		it('should return 400 if veriCode is not provided', async () => {
			const res = await supertest(app).post('/api/verify').send({
				id: userId,
			});
			expect(res.status).toBe(400);
		});

		it('should return 400 if id is invalid', async () => {
			const res = await supertest(app)
				.post('/api/verify')
				.send({
					id: userId + 1,
					veriCode: veriCode,
				});
			expect(res.status).toBe(400);
		});

		it('should return 400 if veriCode is invalid', async () => {
			const res = await supertest(app)
				.post('/api/verify')
				.send({
					id: userId,
					veriCode: veriCode + 'a',
				});
			expect(res.status).toBe(400);
		});
	});

	describe('POST /api/login', () => {
		it('should return 200 if valid email and password are provided', async () => {
			const res = await supertest(app).post('/api/login').send({
				email: process.env.TEST_VALID_EMAIL,
				password: process.env.TEST_VALID_PASSWORD,
			});
			expect(res.status).toBe(200);
		});

		it('should return 400 if email is not provided', async () => {
			const res = await supertest(app).post('/api/login').send({
				password: process.env.TEST_VALID_PASSWORD,
			});
			expect(res.status).toBe(400);
		});

		it('should return 400 if password is not provided', async () => {
			const res = await supertest(app).post('/api/login').send({
				email: process.env.TEST_VALID_EMAIL,
			});
			expect(res.status).toBe(400);
		});

		it('should return 400 if email is invalid', async () => {
			const res = await supertest(app).post('/api/login').send({
				email: process.env.TEST_INVALID_EMAIL,
				password: process.env.TEST_VALID_PASSWORD,
			});
			expect(res.status).toBe(400);
		});

		it('should return 400 if password is invalid', async () => {
			const res = await supertest(app).post('/api/login').send({
				email: process.env.TEST_VALID_EMAIL,
				password: process.env.TEST_INVALID_PASSWORD,
			});
			expect(res.status).toBe(400);
		});

		it('should return 404 if email does not exist', async () => {
			const res = await supertest(app).post('/api/login').send({
				email: 'fake@gmail.com',
				password: process.env.TEST_VALID_PASSWORD,
			});
			expect(res.status).toBe(404);
		});

		it('should return 401 if password is incorrect', async () => {
			const res = await supertest(app).post('/api/login').send({
				email: process.env.TEST_VALID_EMAIL,
				password: 'Fakepassword123',
			});
			expect(res.status).toBe(401);
		});
	});

	describe('PATCH /api/user', () => {
		it('should return return 401 if no token is provided', async () => {
			const res = await supertest(app).patch('/api/user');
			expect(res.status).toBe(401);
		});

		it('should return 403 if invalid token is provided', async () => {
			const res = await supertest(app)
				.patch('/api/user')
				.set('Authorization', 'Bearer ' + process.env.TEST_INVALID_TOKEN + 'a');
			expect(res.status).toBe(403);
		});

		it('should return 404 if token is valid but user does not exist', async () => {
			const res = await supertest(app)
				.patch('/api/user')
				.set('Authorization', 'Bearer ' + process.env.TEST_INVALID_TOKEN);
			expect(res.status).toBe(404);
		});

		it('should return 200 if valid token is provided', async () => {
			const res = await supertest(app)
				.patch('/api/user')
				.set('Authorization', 'Bearer ' + process.env.TEST_VALID_TOKEN)
				.send({ firstName: 'Test' });
			expect(res.status).toBe(200);
		});
	});
});
