const test = require("node:test");
const assert = require("node:assert/strict");
const {
    validateRegister,
    validateExpense
} = require("./validation");

function createResponse() {
    return {
        statusCode: 200,
        payload: null,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(body) {
            this.payload = body;
            return this;
        }
    };
}

test("validateRegister rejects an invalid registration payload", () => {
    const req = {
        body: {
            fullName: "A",
            email: "not-an-email",
            password: "123"
        }
    };
    const res = createResponse();
    let nextCalled = false;

    validateRegister(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, false);
    assert.equal(res.statusCode, 400);
    assert.equal(res.payload.message, "Validation error");
    assert.ok(res.payload.details.length > 0);
});

test("validateExpense passes a valid expense payload", () => {
    const req = {
        body: {
            category: "Food",
            amount: 25.5,
            date: new Date("2024-03-10"),
            icon: "🍔"
        }
    };
    const res = createResponse();
    let nextCalled = false;

    validateExpense(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.equal(res.payload, null);
});