import test from "node:test";
import assert from "node:assert/strict";
import {
    addThousandsSeperator,
    fixImageUrl,
    getInitials,
    prepareExpenseBarChartData,
    validateEmail
} from "./helper.js";

test("validateEmail accepts a valid email and rejects an invalid one", () => {
    assert.equal(validateEmail("user@example.com"), true);
    assert.equal(validateEmail("invalid-email"), false);
});

test("getInitials returns uppercase initials from up to two words", () => {
    assert.equal(getInitials("John Doe"), "JD");
    assert.equal(getInitials("single"), "S");
    assert.equal(getInitials(""), "");
});

test("addThousandsSeperator formats numbers with commas", () => {
    assert.equal(addThousandsSeperator(1234567.89), "1,234,567.89");
    assert.equal(addThousandsSeperator("1000"), "1,000");
    assert.equal(addThousandsSeperator(null), "");
});

test("prepareExpenseBarChartData sorts by date and maps chart values", () => {
    const chartData = prepareExpenseBarChartData([
        { date: "2024-03-10", amount: "40", category: "Food" },
        { date: "2024-03-01", amount: 15, category: "Transport" }
    ]);

    assert.equal(chartData.length, 2);
    assert.equal(chartData[0].amount, 15);
    assert.equal(chartData[0].category, "Transport");
    assert.equal(chartData[1].amount, 40);
    assert.equal(chartData[1].category, "Food");
});

test("fixImageUrl rewrites the old local backend port", () => {
    assert.equal(
        fixImageUrl("http://localhost:8000/uploads/avatar.png"),
        "http://localhost:8001/uploads/avatar.png"
    );
    assert.equal(fixImageUrl("https://example.com/image.png"), "https://example.com/image.png");
    assert.equal(fixImageUrl(""), null);
});