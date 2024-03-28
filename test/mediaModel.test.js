import chai from "chai";
const { expect } = chai;
import mongoose from "mongoose";
import Media from "../models/mediaModel.js";

describe("Media Model", () => {
  // SETUP
  before(async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connection successful");
    } catch (error) {
      console.error("MongoDB connection failed: ", error);
      process.exit(1);
    }
  });

  // TEARDOWN
  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe("Media Schema", () => {
    it("should require title field", () => {
      // SETUP
      const media = new Media();

      // EXERCISE & VERIFY
      media.validate((err) => {
        expect(err.errors.title).to.exist;
      });

      // TEARDOWN is not necessary here as no persistent changes were made during the test
    });

    it("should require url field", () => {
      // SETUP
      const media = new Media();

      // EXERCISE & VERIFY
      media.validate((err) => {
        expect(err.errors.url).to.exist;
      });

      // TEARDOWN is not necessary here as no persistent changes were made during the test
    });

    it("should save a valid media", async () => {
      // SETUP
      const validMedia = new Media({
        title: "Test Media",
        url: "http://testmedia.com",
      });

      // EXERCISE
      const savedMedia = await validMedia.save();

      // VERIFY
      expect(savedMedia.title).to.equal("Test Media");
      expect(savedMedia.url).to.equal("http://testmedia.com");

      // TEARDOWN
      await Media.deleteOne({ _id: savedMedia._id });
    });
  });
});
