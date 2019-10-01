const req = require('supertest');

const app = require('../app');
const db = require('../db');

const Game = require('../games/model');
const auth = require('../lib/auth');

const mockGame = {
	name: 'New Adventure'
};

describe('Game Routes', () => {
	beforeAll(async () => {
		await db.connect('blackthorn-test', 27017);
		await Game.deleteMany({});
	});

	afterAll(done => db.disconnect(done));

    test('GET /games should return an array of games', () =>
    	req(app).get('/games')
    		.set('Authorization', `Bearer ${auth.createToken()}`)
    		.expect(200)
    );

    test('POST /games should create a game', async () => {
    	const before = await Game.countDocuments();
    	const game = await req(app).post('/games')
            .set('Authorization', `Bearer ${auth.createToken({ userId: '1' })}`)
            .send(mockGame);
        const after = await Game.countDocuments();
        expect(game.body.userId).toBe('1');
    	expect(before).toBeLessThan(after);
    });

    test('GET /games/:id should return a game', async () => {
    	const game = await new Game(mockGame);
    	await game.save();

    	return req(app).get(`/games/${game._id}`)
            .set('Authorization', `Bearer ${auth.createToken()}`)
            .expect(200);
    });

    test('PATCH /games/:id should update a game', async () => {
    	const game = await new Game({ ...mockGame, userId: '1' });
    	await game.save();

    	const res = await req(app).patch(`/games/${game._id}`)
            .set('Authorization', `Bearer ${auth.createToken({ userId: '1' })}`)
    		.send({ name: 'Old Adventure' });
    	expect(res.body.name).toBe('Old Adventure');

        return req(app).patch(`/games/${game._id}`)
            .set('Authorization', `Bearer ${auth.createToken({ userId: '2' })}`)
            .send({ name: 'Old Adventure' })
            .expect(403);
    });

    test('DELETE /games/:id should delete a game', async () => {
        const game = await new Game({ ...mockGame, userId: '1' });
    	await game.save();

    	const before = await Game.countDocuments();
    	const res = await req(app).delete(`/games/${game._id}`)
            .set('Authorization', `Bearer ${auth.createToken({ userId: '1' })}`);
    	const after = await Game.countDocuments();

    	expect(before).toBeGreaterThan(after);
    });
});