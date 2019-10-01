const req = require('supertest');

const app = require('../app');
const db = require('../db');

const User = require('../users/model');
const auth = require('../lib/auth');

const mockUser = {
	email: 'stanley@example.com',
	name: 'Stanley',
	password: 'BIMBIMBIM'
};

describe('User Routes', () => {
	beforeAll(async () => {
		await db.connect('blackthorn-test', 27017);
		await User.deleteMany({});
	});

	afterAll(done => db.disconnect(done));

    test('GET /users should return an array of users', () =>
    	req(app).get('/users')
    		.set('Authorization', `Bearer ${auth.createToken()}`)
    		.expect(res => Array.isArray(res.body))
    );

    test('POST /users should create a user', async () => {
    	const before = await User.countDocuments();
    	await req(app).post('/users').send(mockUser);
    	const after = await User.countDocuments();

    	expect(before).toBeLessThan(after);
    });

    test('GET /users/:id should return a user', async () => {
    	const user = await new User(mockUser);
    	await user.save();

    	return req(app).get(`/users/${user._id}`)
            .set('Authorization', `Bearer ${auth.createToken()}`)
            .expect(200);
    });

    test('PATCH /users/:id should update a user', async () => {
    	const user = await new User(mockUser);
    	await user.save();

    	const res = await req(app).patch(`/users/${user._id}`)
            .set('Authorization', `Bearer ${auth.createToken()}`)
    		.send({ name: 'Stan' });
    	expect(res.body.name).toBe('Stan');
    });

    test('DELETE /users/:id should delete a user', async () => {
    	const user = await new User(mockUser);
    	await user.save();

    	const before = await User.countDocuments();
    	await req(app).delete(`/users/${user._id}`)
            .set('Authorization', `Bearer ${auth.createToken()}`);
    	const after = await User.countDocuments();

    	expect(before).toBeGreaterThan(after);
    });

    test('POST /users/current should return a token', async () => {
    	const success = await req(app).post('/users/current')
            .set('Authorization', `Bearer ${auth.createToken()}`)
            .send(mockUser);
    	expect(success.body).toHaveProperty('token');

    	const failure = await req(app).post('/users/current')
            .set('Authorization', `Bearer ${auth.createToken()}`)
            .send({ ...mockUser, password: 'wrong' });
    	expect(failure.statusCode).toBe(403);
    });
});