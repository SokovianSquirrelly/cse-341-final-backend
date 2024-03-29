import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDatabase from "./database/connection.js";
import routes from "./routes/index.js";

const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Middleware for CORS
app.use(cors());

// Connect to database
connectDatabase().then(() => {
  // Use routes
  app.use(routes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("There was an error!");
  });

  // Start the server
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080} `);
    console.log(
      `Click on the link to view the API documentation: http://localhost:${
        process.env.PORT || 8080
      }/api-docs`
    );
  });
});
