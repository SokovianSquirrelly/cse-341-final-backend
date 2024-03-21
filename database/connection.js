const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
const connectDatabase = require("./connection");

describe("connectDatabase", () => {
  let connectStub;

  // SETUP
  beforeEach(() => {
    connectStub = sinon.stub(mongoose, "connect");
  });

  // TEARDOWN
  afterEach(() => {
    connectStub.restore();
  });

  it("should connect to the database successfully", async () => {
    // SETUP
    connectStub.resolves(); // Simulate a successful connection

    // EXERCISE
    await connectDatabase();

    // VERIFY
    expect(connectStub.calledOnce).to.be.true;

    // TEARDOWN is handled in the afterEach hook
  });

  it("should fail to connect to the database", async () => {
    // SETUP
    connectStub.rejects(); // Simulate a failed connection

    // EXERCISE and VERIFY
    try {
      await connectDatabase();
    } catch (error) {
      expect(connectStub.calledOnce).to.be.true;
    }

    // TEARDOWN is handled in the afterEach hook
  });
});
