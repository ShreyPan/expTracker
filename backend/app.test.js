const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "test-refresh-secret";

const app = require("./app");

test("GET /health returns the health payload", async () => {
    const response = await request(app).get("/health");

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "OK");
    assert.ok(response.body.timestamp);
});

test("POST /api/v1/auth/register rejects invalid registration data", async () => {
    const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
            fullName: "A",
            email: "invalid-email",
            password: "123"
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.message, "Validation error");
    assert.ok(response.body.details);
});

test("POST /api/v1/auth/refresh-token rejects missing refresh token", async () => {
    const response = await request(app)
        .post("/api/v1/auth/refresh-token")
        .send({});

    assert.equal(response.status, 401);
    assert.equal(response.body.message, "Refresh token is required");
});