const req = require("supertest");

const app = require("../app");
const db = require("../db");

const Character = require("../characters/model");
const auth = require("../lib/auth");

const mockCharacter = {
  name: "Gary",
  description: "Elf"
};

describe("Character Routes", () => {
  beforeAll(async () => {
    await db.connect("blackthorn-test", 27017);
    await Character.deleteMany({});
  });

  afterAll(done => db.disconnect(done));

  test("GET /characters should return an array of characters", () =>
    req(app)
      .get("/characters")
      .set("Authorization", `Bearer ${auth.createToken()}`)
      .expect(200));

  test("POST /characters should create a character", async () => {
    const before = await Character.countDocuments();
    const character = await req(app)
      .post("/characters")
      .set("Authorization", `Bearer ${auth.createToken({ userId: "1" })}`)
      .send(mockCharacter);
    const after = await Character.countDocuments();
    expect(character.body.userId).toBe("1");
    expect(before).toBeLessThan(after);
  });

  test("GET /characters/:id should return a character", async () => {
    const character = await new Character(mockCharacter);
    await character.save();

    return req(app)
      .get(`/characters/${character._id}`)
      .set("Authorization", `Bearer ${auth.createToken()}`)
      .expect(200);
  });

  test("PATCH /characters/:id should update a character", async () => {
    const character = await new Character({ ...mockCharacter, userId: "1" });
    await character.save();

    const res = await req(app)
      .patch(`/characters/${character._id}`)
      .set("Authorization", `Bearer ${auth.createToken({ userId: "1" })}`)
      .send({ name: "Steve" });
    expect(res.body.name).toBe("Steve");

    return req(app)
      .patch(`/characters/${character._id}`)
      .set("Authorization", `Bearer ${auth.createToken({ userId: "2" })}`)
      .send({ name: "Stanley" })
      .expect(403);
  });

  test("DELETE /characters/:id should delete a character", async () => {
    const character = await new Character({ ...mockCharacter, userId: "1" });
    await character.save();

    const before = await Character.countDocuments();
    const res = await req(app)
      .delete(`/characters/${character._id}`)
      .set("Authorization", `Bearer ${auth.createToken({ userId: "1" })}`);
    const after = await Character.countDocuments();

    expect(before).toBeGreaterThan(after);
  });
});
