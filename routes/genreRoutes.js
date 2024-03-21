const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genreController");
const utilities = require("../utilities");
const validate = require("../utilities/genreValidator");
const { checkAdmin } = require("../middleware/user");

// Routes

// GET all genres
router.get("/", utilities.handleErrors(genreController.getAllGenres));

// GET single genre by id
router.get(
  "/:id",
  // validate.validateId,
  utilities.handleErrors(genreController.getGenreById)
);

// POST new genre
router.post(
  "/",
  // validate.validateGenre,
  utilities.handleErrors(genreController.addGenre)
);

// PUT update genre
router.put(
  "/:id",
  checkAdmin,
  // validate.validateUpdateGenre,
  utilities.handleErrors(genreController.updateGenre)
);

// DELETE genre
router.delete(
  "/:id",
  checkAdmin,
  // validate.validateDeleteGenre,
  utilities.handleErrors(genreController.deleteGenre)
);

module.exports = router;
